import { StyleSheet } from "react-native";

const stylesInfo = StyleSheet.create({
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
  },
  bodyContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  sectionContainer: {
    marginBottom: 28,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  logosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  partnerLogo: {
    width: 110,
    height: 90,
  },
  listContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listIcon: {
    marginRight: 12,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
  },
  listItemPlaceholder: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#95A5A6',
  }
});

export default stylesInfo;