import { StyleSheet, Platform } from "react-native";

const styleReacao = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A0000',
  },
  safeAreaTop: {
    flex: 0,
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
  questionCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 35,
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  ratingCircleSelected: {
    backgroundColor: '#4A0000',
    borderColor: '#4A0000',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A0000',
  },
  ratingTextSelected: {
    color: '#FFFFFF',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  labelSmall: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'android' ? 40 : 30, 
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#4A0000',
    paddingVertical: 16,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  }
});

export default styleReacao;