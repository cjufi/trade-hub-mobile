import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../context/auth_context";
import { baseUrl, getApiOptions } from "../config/apiConfig";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const AdvertisementDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [numberOfLikesAndDislikes, setNumberOfLikesAndDislikes] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAd, setUpdatedAd] = useState(route.params.ad);
  const [selectedStatus, setSelectedStatus] = useState(
    updatedAd.advertisementStatus.id
  );
  const [advertisementStatuses] = useState([
    { id: 1, statusName: "ACTIVE" },
    { id: 2, statusName: "SOLD" },
  ]);
  const authCtx = useContext(AuthContext);
  const ad = route.params.ad;

  const handleUpdateAd = async () => {
    let options = getApiOptions(authCtx.token, "PATCH", true);
    options.url = `${baseUrl}/advertisements/${ad.id}`;
    options.data = {
      ...updatedAd,
      advertisementStatus: selectedStatus,
    };

    try {
      await axios.request(options);
      alert("Advertisement updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Error updating advertisement!");
      console.log(error);
    }
  };

  const handleNavigateToRatings = () => {
    navigation.navigate("User Ratings", {
      user: ad.user,
      numOfLikes: numberOfLikesAndDislikes,
      adId: ad.id,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchLikeAndDislikeNumbers = async () => {
        let options = getApiOptions(authCtx.token, "GET", false);
        options.url = `${baseUrl}/user/${parseInt(ad.user.id)}/likesNumber`;
        try {
          const response = await axios.request(options);
          setNumberOfLikesAndDislikes(response.data);
        } catch (error) {
          alert("Error fetching likes and dislikes!");
          console.log(error);
        }
      };

      fetchLikeAndDislikeNumbers();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${ad.picture}` }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.dateTitle}>
          <Text style={styles.title}>{updatedAd.title}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.category}>
            Category: {updatedAd.advertisementCategory}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={styles.price}
          >{`${updatedAd.price.toLocaleString()} $`}</Text>
        </View>

        <Text style={styles.description}>{updatedAd.description}</Text>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoTitle}>Seller Information</Text>
          <View style={styles.userInfoContent}>
            <View style={styles.userInfoItem}>
              <Ionicons
                name="man"
                size={24}
                color="#555"
                style={styles.userInfoIcon}
              />
              <Text style={styles.userInfoText}>{ad.user.name}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Ionicons
                name="phone-portrait"
                size={24}
                color="#555"
                style={styles.userInfoIcon}
              />
              <Text style={styles.userInfoText}>{ad.user.phone}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Ionicons
                name="mail"
                size={24}
                color="#555"
                style={styles.userInfoIcon}
              />
              <Text style={styles.userInfoText}>{ad.user.email}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Ionicons
                name="location-sharp"
                size={24}
                color="#555"
                style={styles.userInfoIcon}
              />
              <Text style={styles.userInfoText}>{ad.user.city}</Text>
            </View>
            <TouchableOpacity
              style={styles.userInfoItem}
              onPress={handleNavigateToRatings}
            >
              <View style={styles.likesContainer}>
                <Ionicons
                  name="thumbs-up"
                  size={24}
                  color="#555"
                  style={styles.likesIcon}
                />
                <Text style={styles.likesText}>
                  {numberOfLikesAndDislikes.likes}
                </Text>
              </View>
              <View style={styles.dislikesContainer}>
                <Ionicons
                  name="thumbs-down"
                  size={24}
                  color="#555"
                  style={styles.dislikesIcon}
                />
                <Text style={styles.dislikesText}>
                  {numberOfLikesAndDislikes.dislikes}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {authCtx.email === ad.user.email ? (
          isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={updatedAd.title}
                onChangeText={(text) =>
                  setUpdatedAd({ ...updatedAd, title: text })
                }
                placeholder="Title"
              />
              <TextInput
                style={styles.input}
                value={updatedAd.description}
                onChangeText={(text) =>
                  setUpdatedAd({ ...updatedAd, description: text })
                }
                placeholder="Description"
              />
              <TextInput
                style={styles.input}
                value={updatedAd.price.toString()}
                onChangeText={(text) =>
                  setUpdatedAd({ ...updatedAd, price: parseFloat(text) })
                }
                placeholder="Price"
                keyboardType="numeric"
              />
              <Picker
                selectedValue={selectedStatus}
                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                style={styles.picker}
              >
                {advertisementStatuses.map((status) => (
                  <Picker.Item
                    key={status.id}
                    label={status.statusName}
                    value={status.id}
                  />
                ))}
              </Picker>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdateAd}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit Advertisement</Text>
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </ScrollView>
  );
};

export default AdvertisementDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dateTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: "gray",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginTop: 8,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 5,
    fontSize: 16,
    color: "gray",
  },
  userInfoContainer: {
    marginTop: 20,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfoContent: {
    marginTop: 10,
  },
  userInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfoIcon: {
    marginRight: 10,
  },
  userInfoText: {
    fontSize: 16,
    color: "gray",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  likesIcon: {
    marginRight: 5,
  },
  likesText: {
    fontSize: 16,
    color: "gray",
  },
  dislikesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dislikesIcon: {
    marginRight: 5,
  },
  dislikesText: {
    fontSize: 16,
    color: "gray",
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  editContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
