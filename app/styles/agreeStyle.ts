import { StyleSheet } from "react-native";

const styleConfirm = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  logo: {
    width: 210,
    height: 210,
    marginTop: 15, 
  },
  bodySection: {
    flex: 1,
    backgroundColor: '#4A0000',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute', 
    left: 20,
    top: 42,
    zIndex: 10,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  iconContainer: {
    marginVertical: 40,
  },
  messageText: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subMessage: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#4A0000',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default styleConfirm;