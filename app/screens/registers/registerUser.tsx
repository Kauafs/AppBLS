import React from 'react';
import { View, TextInput, Text, ScrollView, Alert, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { useAuth } from '../../../src/hooks/userRegisters'; 
import styleRegister from '@/app/styles/registerStyle';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CadastroSchema = Yup.object().shape({
  nome: Yup.string().required('Nome obrigatório'),
  cpf: Yup.string().min(14, 'CPF incompleto').required('CPF obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  celular: Yup.string().min(15, 'Celular incompleto').required('Celular obrigatório'),
  dataNascimento: Yup.string().min(10, 'Data incompleta').required('Obrigatório'),
  senha: Yup.string().min(8, 'Mínimo 6 dígitos').required('Senha obrigatória'),
  semestre: Yup.string().when('vinculo', {
    is: 'Discente',
    then: (schema) => schema.required('Informe o semestre'),
  }),
  termoTCLE: Yup.boolean().oneOf([true], 'Você deve aceitar os termos'),
});

export default function CadastroScreen() {
  const router = useRouter();
  const { realizarCadastro } = useAuth();

  const maskCPF = (v: string) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').substring(0, 14);
  const maskDate = (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 10);
  const maskPhone = (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 15);

  const onSubmit = async (values: any) => {
    const cursoFinal = values.vinculo === 'Discente' ? values.curso : 'N/A';
    const semestreFinal = values.vinculo === 'Discente' ? parseInt(values.semestre) : 0;

    const result = await realizarCadastro({
      ...values,
      curso: cursoFinal,
      semestre: semestreFinal
    });

    if (result.success) {
      Alert.alert("Sucesso!", "Cadastro realizado.", [
        { text: "OK", onPress: () => router.replace('/screens/login/loginUser') }
      ]);
    } else {
      Alert.alert("Erro", result.error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}> 
      <StatusBar style='dark'/>
      
      <View style={styleRegister.logoSection}>
        <Image source={require('../../../assets/images/logoof2.png')} style={styleRegister.logo} resizeMode="contain" />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
        style={{ flex: 1, backgroundColor: '#4A0000' }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150} 
      >
        <ScrollView 
          style={styleRegister.container} 
          contentContainerStyle={{ flexGrow: 1 }} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={{
              nome: '', cpf: '', email: '', celular: '', dataNascimento: '',
              senha: '', vinculo: 'Discente', curso: 'Medicina', genero: 'Masculino',
              semestre: '', experienciaPrevia: false, termoTCLE: false
            }}
            validationSchema={CadastroSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <View style={styleRegister.formSection}>
                
                <Text style={styleRegister.label}>Nome Completo:</Text>
                <View style={styleRegister.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="#999" style={styleRegister.inputIcon} />
                  <TextInput style={styleRegister.inputField} placeholder="Seu nome" onChangeText={handleChange('nome')} onBlur={handleBlur('nome')} value={values.nome} />
                </View>
                {errors.nome && touched.nome && <Text style={styleRegister.errorText}>{errors.nome}</Text>}

                <Text style={styleRegister.label}>CPF:</Text>
                <View style={styleRegister.inputContainer}>
                  <Ionicons name="card-outline" size={20} color="#999" style={styleRegister.inputIcon} />
                  <TextInput 
                    style={styleRegister.inputField} placeholder="000.000.000-00" keyboardType="numeric"
                    onChangeText={(t) => setFieldValue('cpf', maskCPF(t))} value={values.cpf}
                  />
                </View>
                {errors.cpf && touched.cpf && <Text style={styleRegister.errorText}>{errors.cpf}</Text>}

                <Text style={styleRegister.label}>E-Mail:</Text>
                <View style={styleRegister.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#999" style={styleRegister.inputIcon} />
                  <TextInput style={styleRegister.inputField} placeholder="email@exemplo.com" keyboardType="email-address" autoCapitalize="none" onChangeText={handleChange('email')} value={values.email} />
                </View>
                {errors.email && touched.email && <Text style={styleRegister.errorText}>{errors.email}</Text>}

                <Text style={styleRegister.label}>Celular:</Text>
                <View style={styleRegister.inputContainer}>
                  <Ionicons name="call-outline" size={20} color="#999" style={styleRegister.inputIcon} />
                  <TextInput 
                    style={styleRegister.inputField} placeholder="(00) 00000-0000" keyboardType="phone-pad"
                    onChangeText={(t) => setFieldValue('celular', maskPhone(t))} value={values.celular}
                  />
                </View>
                {errors.celular && touched.celular && <Text style={styleRegister.errorText}>{errors.celular}</Text>}

                <View style={styleRegister.rowContainer}>
                  <View style={styleRegister.halfInputContainer}>
                    <Text style={styleRegister.label}>Nascimento:</Text>
                    <View style={styleRegister.inputContainer}>
                      <TextInput 
                        style={styleRegister.inputField} placeholder="00/00/0000" keyboardType="numeric"
                        onChangeText={(t) => setFieldValue('dataNascimento', maskDate(t))} value={values.dataNascimento}
                      />
                    </View>
                    {errors.dataNascimento && touched.dataNascimento && <Text style={styleRegister.errorText}>{errors.dataNascimento}</Text>}
                  </View>
                  <View style={styleRegister.halfInputContainer}>
                    <Text style={styleRegister.label}>Gênero:</Text>
                    <View style={styleRegister.pickerWrapper}>
                      <Picker selectedValue={values.genero} onValueChange={(v) => setFieldValue('genero', v)} style={styleRegister.picker}>
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Feminino" value="Feminino" />
                        <Picker.Item label="Prefiro não dizer" value="Prefiro não dizer" />
                        <Picker.Item label="Outro" value="Outro" />
                      </Picker>
                    </View>
                  </View>
                </View>

                <Text style={styleRegister.label}>Vínculo:</Text>
                <View style={styleRegister.pickerWrapper}>
                  <Picker selectedValue={values.vinculo} onValueChange={(v) => setFieldValue('vinculo', v)} style={styleRegister.picker}>
                    <Picker.Item label="Discente" value="Discente" />
                    <Picker.Item label="Docente" value="Docente" />
                    <Picker.Item label="Colaborador" value="Colaborador" />
                  </Picker>
                </View>

                {values.vinculo === 'Discente' && (
                  <View style={styleRegister.rowContainer}>
                    <View style={styleRegister.halfInputContainer}>
                      <Text style={styleRegister.label}>Curso:</Text>
                      <View style={styleRegister.pickerWrapper}>
                        <Picker selectedValue={values.curso} onValueChange={(v) => setFieldValue('curso', v)} style={styleRegister.picker}>
                          <Picker.Item label="Medicina" value="Medicina" />
                          <Picker.Item label="Enfermagem" value="Enfermagem" />
                          <Picker.Item label="Nutrição" value="Nutrição" />
                          <Picker.Item label="Fisioterapia" value="Fisioterapia" />
                        </Picker>
                      </View>
                    </View>
                    <View style={styleRegister.halfInputContainer}>
                      <Text style={styleRegister.label}>Semestre:</Text>
                      <View style={styleRegister.inputContainer}>
                        <TextInput style={styleRegister.inputField} placeholder="1º" keyboardType="numeric" onChangeText={handleChange('semestre')} value={values.semestre} />
                      </View>
                      {errors.semestre && touched.semestre && <Text style={styleRegister.errorText}>{errors.semestre}</Text>}
                    </View>
                  </View>
                )}

                <Text style={styleRegister.label}>Senha:</Text>
                <View style={styleRegister.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" style={styleRegister.inputIcon} />
                  <TextInput 
                    style={styleRegister.inputField} 
                    secureTextEntry 
                    placeholder="Sua senha" 
                    onChangeText={handleChange('senha')} 
                    onBlur={handleBlur('senha')} 
                    value={values.senha} 
                  />
                </View>
                {errors.senha && touched.senha && <Text style={styleRegister.errorText}>{errors.senha}</Text>}

                <View style={styleRegister.checkboxContainer}>
                  <Checkbox value={values.experienciaPrevia} onValueChange={(v) => setFieldValue('experienciaPrevia', v)} color="#FFFFFF" />
                  <Text style={styleRegister.checkboxLabel}>Possui experiência em BLS?</Text>
                </View>

                <View style={[styleRegister.checkboxContainer, { marginTop: 20 }]}>
                  <Checkbox value={values.termoTCLE} onValueChange={(v) => setFieldValue('termoTCLE', v)} color="#FFFFFF" />
                  <Text style={styleRegister.checkboxLabel}>Aceito os termos do TCLE</Text>
                </View>
                {errors.termoTCLE && touched.termoTCLE && <Text style={styleRegister.errorText}>{errors.termoTCLE}</Text>}

                <View style={styleRegister.buttonRow}>
                  <TouchableOpacity style={styleRegister.button} onPress={() => router.back()}>
                    <Text style={styleRegister.buttonText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styleRegister.button} onPress={() => handleSubmit()}>
                    <Text style={styleRegister.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}