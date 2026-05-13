import { StyleSheet } from "react-native";



const styleResultPos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A0000',
  },
  headerSection: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A0000',
    position: 'relative',
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
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  bodyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  resultCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#4A0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 30,
    textAlign: 'center',
  },
  scoreContainer: {
    alignSelf: 'center', 
    marginBottom: 30,
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 10,
  },
  replyBox: { 
    width: '100%',
    marginTop: 10,
    marginBottom: 25,
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
    fontSize: 14,
    lineHeight: 20
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10
  },
  button: {
    backgroundColor: '#4A0000',
    paddingVertical: 14,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default styleResultPos;