import { StyleSheet } from "react-native";

const styleQuiz = StyleSheet.create({
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
  bodySection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
    position: 'relative',
    height: 30,
  },
  backIcon: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A0000',
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 15,
    flex: 1, 
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressStepBadge: {
    backgroundColor: '#4A0000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 10,
  },
  progressStepText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4A0000',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A0000',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 15,
    textAlign: 'justify',
    lineHeight: 24
  },
  optionsWrapper: {
    marginTop: 5,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingVertical: 2,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#4A0000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#4A0000',
  },
  optionText: {
    fontSize: 15,
    color: '#4A0000',
    flex: 1,
    fontWeight: '500',
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 35, 
    paddingTop: 15,
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    backgroundColor: '#4A0000',
    paddingVertical: 12,
    borderRadius: 100,
    width: '45%',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default styleQuiz;