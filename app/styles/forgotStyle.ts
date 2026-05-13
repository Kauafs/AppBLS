import { StyleSheet } from "react-native";

const styleForgot = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  headerSection: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
   
  },
  bodySection: {
    flex: 1,
    backgroundColor: '#4A0000', 
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#E0E0E0',
    lineHeight: 22,
    marginBottom: 40,
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
    marginBottom: 5,
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
    marginBottom: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFFFFF', 
    padding: 18,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#4A0000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  backLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontSize: 14,
  }
});

export default styleForgot;