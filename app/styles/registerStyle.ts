import { StyleSheet } from "react-native";

const styleRegister = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A0000', 
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
    marginTop: 35,
  },
  formSection: {
    flex: 1,
    backgroundColor: '#4A0000',
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 100, 
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
    marginTop: 4,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInputContainer: {
    width: '48%',
  },
  pickerWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    height: 55,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  buttonText: {
    color: '#4A0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styleRegister;