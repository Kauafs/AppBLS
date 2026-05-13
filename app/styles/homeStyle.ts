import { StyleSheet } from "react-native";

const styleHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 250,
    height: 200,
    backgroundColor: '#F3F4F6', 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    letterSpacing: 8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40, 
  },
  button: {
    width: '100%',
    backgroundColor: '#4A0000', 
    paddingVertical: 20,
    borderRadius: 100, 
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'none', 
  },
});

export default styleHome;