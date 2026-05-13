import { StyleSheet } from "react-native";

const styleLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoSection: {
    height: 120, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 210,
    height: 210,
    marginTop: 30,
  },
  formSection: {
    flex: 1, 
    backgroundColor: '#4A0000',
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  errorText: {
    color: '#FFD7D7',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  rowOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    width: '100%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginRight: 8,
  },
  forgotPassContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPassText: {
    color: '#FFFFFF',
    fontSize: 13,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#4A0000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerLink: {
    marginTop: 40,
    alignItems: 'center',
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  boldText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  }
});

export default styleLogin;