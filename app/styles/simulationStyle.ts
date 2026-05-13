import { StyleSheet } from "react-native";

const styleSimulacao = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A0000',
  },
 
  headerSection: {
    height: 40,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A0000',
    textAlign: 'center',
  },
  // Cards de Cenário
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A0000',
    borderBottomWidth: 1,
    borderBottomColor: '#4A0000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#4A0000',
    marginBottom: 15,
  },
  btnIniciar: {
    backgroundColor: '#4A0000',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styleSimulacao;