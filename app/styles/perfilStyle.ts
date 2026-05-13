import { StyleSheet } from "react-native";

const stylePerfil = StyleSheet.create({
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
    paddingHorizontal: 20,
    borderRadius: 0 
  },

  logoHeader: { 
    width: 180,
    height: 180,
    marginBottom: '10%'
  },

  headerLeftButton: { 
    position: 'absolute',
    left: 20,
    marginBottom: '10%',
    zIndex: 10 
  },

  headerRightButton: { 
    position: 'absolute',
    right: 20,
    marginBottom: '10%',
    zIndex: 10
  },

  bodySection: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 25, 
    paddingTop: 25,
    borderRadius: 0 
  },

  mainTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    textAlign: 'center', 
    marginBottom: 25 
  },
  
 
  idCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15, 
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3
  },
  avatarPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#4A0000',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  idInfo: { 
    flex: 1,
    justifyContent: 'center' 
  },
  userName: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4A0000' 
  },
  userId: { 
    fontSize: 12, 
    color: '#888', 
    marginTop: 2 
  },
  userSubInfo: { 
    fontSize: 13, 
    color: '#4A0000', 
    marginTop: 8, 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(74, 0, 0, 0.1)', 
    paddingTop: 5 
  },
  
  infoCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    textAlign: 'center', 
    marginBottom: 5 
  },
  divider: { 
    height: 1, 
    backgroundColor: 'rgba(74, 0, 0, 0.1)', 
    marginVertical: 12 
  },
  rowInfo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  infoLabel: { 
    fontSize: 14, 
    color: '#666' 
  },
  infoValue: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4A0000' 
  },
  timeValue: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    textAlign: 'center' 
  },
  
  progressBarBg: { 
    height: 10, 
    backgroundColor: '#DDD', 
    borderRadius: 5, 
    overflow: 'hidden' 
  },
  progressFill: { 
    height: '100%', 
    backgroundColor: '#4A0000' 
  },

  resultButton: { 
    backgroundColor: '#4A0000', 
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  resultButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  editButton: { 
    backgroundColor: '#4A0000', 
    padding: 16, 
    borderRadius: 100, 
    alignItems: 'center',
    marginTop: 10
  },
  editButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },

  inputLabel: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    marginBottom: 5 
  },
  input: { 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#DDD', 
    borderRadius: 10, 
    padding: 12, 
    fontSize: 16, 
    marginBottom: 15 
  },
  saveButton: { 
    backgroundColor: '#4A0000', 
    padding: 16, 
    borderRadius: 100, 
    alignItems: 'center', 
    marginTop: 10 
  },
  saveButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },
  cancelButton: { 
    marginTop: 15, 
    alignItems: 'center' 
  },
  cancelButtonText: { 
    color: '#888', 
    fontSize: 14 
  },

  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFF' 
  },
});

export default stylePerfil;