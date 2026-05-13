import { StyleSheet } from "react-native";

const styleList = StyleSheet.create({
  container: { 
    flex: 1, 
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
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4A0000',
    elevation: 3,
  },
  cardLocked: { 
    borderColor: '#ccc', 
    opacity: 0.7 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5
  },
  cardTitle: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#4A0000' 
  },
  lessonName: { 
    fontSize: 15, 
    color: '#333', 
    marginBottom: 15, 
    fontWeight: '500' 
  },
  progressionText: { 
    fontSize: 11, 
    color: '#666', 
    marginBottom: 5,
    fontWeight: 'bold'
  },
  loader: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF' 
  },
  progressBarBg: { 
    height: 10, 
    backgroundColor: '#FFF', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#4A0000', 
    overflow: 'hidden', 
    width: '100%', 
    marginBottom: 15 
  },
  progressFill: { 
    height: '100%', 
    backgroundColor: '#4A0000' 
  },
  actionButton: { 
    backgroundColor: '#4A0000', 
    paddingVertical: 12, 
    borderRadius: 100, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },
  lockedContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5,
    paddingVertical: 10
  },
  lockedText: { 
    color: '#666', 
    fontSize: 13, 
    marginLeft: 12, 
    flex: 1,
    fontWeight: '500'
  }
});

export default styleList;