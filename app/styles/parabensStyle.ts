import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styleParabens = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A0000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 25,
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  message: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 40,
    lineHeight: 26,
  },
  button: {
    width: width * 0.8,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: '#4A0000',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  linkText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    marginTop: 25,
    textDecorationLine: 'underline',
  }
});

export default styleParabens;