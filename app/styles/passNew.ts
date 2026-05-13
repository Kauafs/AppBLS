import { StyleSheet } from "react-native";

const styleNovaSenha = StyleSheet.create({
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
    paddingTop: 30,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#4A0000',
    lineHeight: 20,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1.5,
    borderColor: '#4A0000',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  rulesContainer: {
    marginBottom: 40,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 14,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30
  },
  btnCancel: {
    width: '48%',
    height: 55,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#4A0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSave: {
    width: '48%',
    height: 55,
    borderRadius: 100,
    backgroundColor: '#4A0000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  btnTextCancel: {
    color: '#4A0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnTextSave: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default styleNovaSenha;