import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { doc, setDoc } from 'firebase/firestore';

export type Vinculo = 'Discente' | 'Docente' | 'Colaborador';
export type Curso = 'Medicina' | 'Enfermagem' | 'Nutrição' | 'Fisioterapia';
export type Genero = 'Masculino' | 'Feminino' | 'Outro' | 'Prefiro não dizer';

interface CadastroData {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  vinculo: Vinculo;
  curso: Curso;
  semestre: number;
  genero: Genero;
  celular: string;
  dataNascimento: string; 
  experienciaPrevia: boolean;
  termoTCLE: boolean;
}

export const useAuth = () => {
  
  const realizarCadastro = async (dados: CadastroData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: dados.nome
      });

      await setDoc(doc(db, "usuarios", dados.cpf), {
        uid: user.uid,
        cpf: dados.cpf,
        nome_completo: dados.nome,
        email: dados.email,
        vinculo: dados.vinculo,
        curso: dados.curso,
        semestre: dados.semestre,
        genero: dados.genero,
        celular: dados.celular,
        data_nascimento: dados.dataNascimento,
        data_cadastro: new Date().toISOString(),
        experiencia_previa: dados.experienciaPrevia,
        termo_tcle: dados.termoTCLE,
        progresso: {
          modulo_atual: 1,
          concluido: false,
          data_liberacao_pos_teste: null 
        },
        notas: {
          pre_teste: null,
          pos_teste: null
        }
      });

      return { success: true };
    } catch (error: any) {
      let mensagemErro = "Erro ao realizar cadastro.";
      if (error.code === 'auth/email-already-in-use') mensagemErro = "Este e-mail já está em uso.";
      if (error.code === 'auth/weak-password') mensagemErro = "A senha deve ter no mínimo 6 caracteres.";
      return { success: false, error: mensagemErro };
    }
  };

  const realizarLogin = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return { success: true };
    } catch (error: any) {
      let mensagemErro = "E-mail ou senha incorretos.";
      return { success: false, error: mensagemErro };
    }
  };

  return { 
    realizarCadastro, 
    realizarLogin 
  };
};