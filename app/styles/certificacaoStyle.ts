import { StyleSheet } from "react-native";

const styleCert = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#4A0000' 
  },
  safeAreaTop: { 
    flex: 0, 
    backgroundColor: '#4A0000' 
  },
  
  headerSection: { 
    height: 40, 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#4A0000',
    position: 'relative',
    paddingHorizontal: 20
  },
  logo: { 
    width: 180, 
    height: 180, 
    marginBottom: '10%' 
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
    borderTopRightRadius: 0
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    textAlign: 'center',
    marginBottom: 10
  },
  iconStatus: { 
    alignItems: 'center', 
    marginVertical: 20 
  },
  progressoTexto: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  requisitoCard: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  requisitoText: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#4A0000' 
  },
  btnAcao: { 
    backgroundColor: '#4A0000', 
    flexDirection: 'row',
    paddingVertical: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 20
  },
  btnDesativado: { 
    backgroundColor: '#CCC' 
  },
  btnText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  avisoTexto: { 
    color: '#999', 
    textAlign: 'center', 
    marginTop: 15, 
    fontSize: 12 
  }
});

export default styleCert;