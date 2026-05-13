import { StyleSheet, Platform } from "react-native";

const stylePlayer = StyleSheet.create({
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
    borderRadius: 0 
  },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20,
    width: '100%',
    position: 'relative'
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    textAlign: 'center',
    flex: 1 
  },
  contentCard: { 
    flex: 1, 
    backgroundColor: '#F9F9F9', 
    borderRadius: 15, 
    padding: 20, 
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  labelRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  label: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#4A0000', 
    marginLeft: 8 
  },
  descText: { 
    fontSize: 15, 
    color: '#333', 
    lineHeight: 22 
  },
  imageWrapper: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  videoContainer: { 
    flex: 1, 
    backgroundColor: '#000', 
    borderRadius: 12, 
    overflow: 'hidden' 
  },
  optionButton: { 
    padding: 15, 
    borderRadius: 12, 
    backgroundColor: '#F5F5F5', 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#DDD' 
  },
  optionSelected: { 
    backgroundColor: '#4A0000', 
    borderColor: '#4A0000' 
  },
  optionText: { 
    color: '#4A0000', 
    fontWeight: '500' 
  },
  optionTextSelected: { 
    color: '#FFF' 
  },
  actionButton: { 
    backgroundColor: '#4A0000', 
    paddingVertical: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 10
  },
  buttonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});

export default stylePlayer;