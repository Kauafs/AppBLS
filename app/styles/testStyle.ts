import { StyleSheet } from "react-native";

const styleTest = StyleSheet.create({
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
    zIndex: 10
  },
  bodySection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#4A0000',
    textAlign: 'center',
  },
  // CARDS MAIORES (LARGE)
  cardLarge: {
    borderWidth: 2,
    borderColor: '#4A0000',
    borderRadius: 20, 
    padding: 25,     
    marginBottom: 25,
    backgroundColor: '#F9F9F9',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardLocked: {
    borderColor: '#DCDCDC',
    backgroundColor: '#F2F2F2',
  },
  cardIconContainer: {
    marginBottom: 15,
  },
  cardTitleLarge: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 10,
  },
  cardDescriptionLarge: {
    fontSize: 16, 
    color: '#444',
    lineHeight: 22,
    marginBottom: 15,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  lockedBadgeText: {
    color: '#666',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  footer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  startButton: {
    backgroundColor: '#4A0000',
    paddingVertical: 20, 
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20, 
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  }
});

export default styleTest;