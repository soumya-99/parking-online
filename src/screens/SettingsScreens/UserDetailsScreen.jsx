import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PixelRatio,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { loginStorage } from "../../storage/appStorage";

const UserDetailsScreen = ({ navigation }) => {

  const loginData = JSON.parse(loginStorage.getString("login-data"));
  const userDetails = loginData.user.userdata.msg[0];
  return (
    <>
      {/* render Header */}
      <CustomHeader title={"User Info"} navigation={navigation} />

      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>User Details</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.row}>
              <Text style={styles.label}>ID</Text>
              <Text style={styles.value}>
                {!userDetails ? <ActivityIndicator size="small" /> : userDetails.id}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>
                {!userDetails ? <ActivityIndicator size="small" /> : "userDetails.name"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>User Type</Text>
              <Text style={styles.value}>
                {!userDetails ? <ActivityIndicator size="small" /> : userDetails.user_type}
              </Text>
            </View>
            {/* Add more user details here */}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F6F6",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  cardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#379EBE",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardHeaderText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardBody: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "#555555",
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: "#333333",
  },
});

export default UserDetailsScreen;
