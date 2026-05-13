import { StyleSheet } from "react-native";

const styleForum = StyleSheet.create({
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
    marginBottom: -50, 
    paddingBottom: 70, 
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
  
  messageCard: { 
    backgroundColor: '#F2F2F2', 
    padding: 16, 
    marginVertical: 8, 
    borderRadius: 15, 
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1 
  },
  user: {
    fontWeight: 'bold', 
    color: '#4A0000', 
    marginBottom: 4, 
    fontSize: 11, 
    textTransform: 'uppercase' 
  },
  text: { 
    color: '#333', 
    fontSize: 15, 
    lineHeight: 20 
  },
  replyBox: { 
    marginTop: 12, 
    padding: 12, 
    backgroundColor: '#E8F5E9', 
    borderRadius: 10, 
    borderLeftWidth: 4, 
    borderLeftColor: '#27ae60' 
  },
  replyHeader: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#27ae60', 
    marginBottom: 4 
  },
  replyText: { 
    color: '#2d3436', 
    fontSize: 14 
  },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#FFFFFF', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#EEEEEE',
    paddingBottom: 35 
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#CCCCCC', 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 45, 
    backgroundColor: '#FAFAFA',
    color: '#333'
  },
  sendBtn: { 
    marginLeft: 10, 
    backgroundColor: '#4A0000', 
    width: 45,
    height: 45,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styleForum;