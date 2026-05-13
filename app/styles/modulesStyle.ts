import { StyleSheet } from "react-native";

const styleModule = StyleSheet.create({
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

  profileBtn: {
    position: 'absolute',
    right: 20,
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
  card: {
    borderWidth: 2,
    borderColor: '#4A0000',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLocked: {
    borderColor: '#ccc',
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A0000',
  },
  moduleName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#4A0000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lockedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  lockedText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
  }
});

export default styleModule;