import { StyleSheet } from "react-native";

const styleExec = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A0000',
  },
  headerSection: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A0000',
    position: 'relative',
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: '10%',
  },
  headerLeftButton: { 
    position: 'absolute',
    left: 20,
    width: 45,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: '10%',
    zIndex: 10
  },
  headerRightButton: { 
    position: 'absolute',
    right: 20,
    width: 45, 
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '10%',
    zIndex: 10
  },
  bodySection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  simulacaoImage: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#EEE',
  },
  perguntaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A0000',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
  opcaoCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  opcaoText: {
    color: '#4A0000',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  }
});

export default styleExec;