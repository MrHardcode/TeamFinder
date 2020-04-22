import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import MapView from "react-native-maps";
import LoginInput, { LoginIcon } from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import facade from "./facades/searchFacade";
import FindFriends from "./components/FindFriends.jsx";

export default function App() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [region, setRegion] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let mapRef = useRef(null);

  useEffect(() => {
    centerOnRegion();
  }, [region]);

  const cancelLoginHandler = () => {
    setIsLoginMode(false);
  };

  const cancelSearch = () => {
    setIsSearchMode(false);
  };

  const searchHandler = async (distance) => {
    if (!user.username || !user.password) {
      Alert.alert("Please log in before searching");
      return;
    }
    if (!position.longitude || !position.latitude) {
      Alert.alert("Please upload position before searching");
      return;
    }
    if (!distance || 0 > distance) {
      Alert.alert("Invalid search distance");
      return;
    }
    try {
      const data = await facade.fetchNearbyPlayers(
        position.latitude,
        position.longitude,
        user.username,
        user.password,
        distance
      );
      if (data.message) {
        Alert.alert(data.message);
        return;
      }
      setIsSearchMode(false);
      setFriends(data);
    } catch (err) {
      console.log(err);
      Alert.alert(err.message);
    }
  };

  const createMapViewMarkers = () => {
    if (friends[0]) {
      const friendMakers = friends.map((element) => {
        return (
          <MapView.Marker
            /* Username is unique in the DB so we can use it as react key */
            key={element.userName}
            title={element.name}
            pinColor="red"
            coordinate={{
              longitude: element.lon,
              latitude: element.lat,
            }}
          />
        );
      });
      return friendMakers;
    }
  };

  const loginInputHandler = (username, password) => {
    if (!username || !password) {
      Alert.alert("Please type in both username and password");
      return;
    }
    setUser({
      username,
      password,
    });
    setIsLoginMode(false);
  };

  const logoutInputHandler = () => {
    setUser({});
    setIsLoginMode(false);
  };

  const getLocationAsync = async () => {
    //Request permission for users location, get the location and call this method from useEffect
    setLoading(true);
    // let status;
    // try {
    //   let result = await Location.requestPermissionsAsync();
    //   status = result.status;
    // } catch (err) {
    //   Alert - alert("Could not get permission to use location");
    //   console.log(err);
    //   return;
    // }
    // if (status !== "granted") {
    //   Alert.alert("Permission to access location was denied");
    //   return;
    // }

    // let location = await Location.getCurrentPositionAsync({
    //   enableHighAccuracy: true,
    // });
    // setPosition({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    // });
    //-----------------------------------
    //-----------------------------------
    //-- Using fake data while testing --
    //-----------------------------------
    //-----------------------------------
    setPosition({
      latitude: 55.768,
      longitude: 12.4999,
    });
    setLoading(false);
    setRegion({
      latitude: 55.768,
      longitude: 12.4999,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    // setRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
  };

  const centerOnRegion = () => {
    if (region) mapRef.current.animateToRegion(region, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menubar}>
        <View style={styles.ghost}>{/* ghost component for styling */}</View>
        <View style={styles.title}>
          <Text style={styles.titleText}>TeamFinder</Text>
        </View>
        <View style={styles.loginButton}></View>
        <TouchableOpacity
          onPress={() => {
            setIsLoginMode(true);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <LoginIcon />
          <Text>LOGIN</Text>
          {!user.username && (
            <LoginInput
              visible={isLoginMode}
              loginInputHandler={loginInputHandler}
              logoutInputHandler={logoutInputHandler}
              onCancel={cancelLoginHandler}
            />
          )}
          {user.username && (
            <Logout
              visible={isLoginMode}
              user={user}
              logoutInputHandler={logoutInputHandler}
              onCancel={cancelLoginHandler}
            />
          )}
        </TouchableOpacity>
      </View>
      <MapView ref={mapRef} mapType="standard" style={styles.mapStyle}>
        {position.longitude && (
          <MapView.Marker
            title="Me"
            pinColor="blue"
            coordinate={{
              longitude: position.longitude,
              latitude: position.latitude,
            }}
          />
        )}
        {/* Found friends will show up on the map */}
        {friends[0] && createMapViewMarkers()}
      </MapView>
      <View style={styles.bottomMenu}>
        <View style={{ backgroundColor: "black", height: 1 }}></View>
        <TouchableOpacity style={styles.getPosition} onPress={getLocationAsync}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text>CENTER ON REAL POSITION</Text>
          )}
        </TouchableOpacity>
        <View style={{ backgroundColor: "black", height: 2 }}></View>
        <TouchableOpacity
          style={styles.findFriends}
          onPress={() => setIsSearchMode(true)}
        >
          <FindFriends
            visible={isSearchMode}
            search={searchHandler}
            onCancel={cancelSearch}
          />
          <Text>FIND FRIENDS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menubar: {
    height: 25,
    width: "100%",
    backgroundColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ghost: {
    width: "34%",
  },
  title: {
    width: "32%",
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
  },
  loginButton: {
    width: "15%",
    alignItems: "flex-start",
  },
  mapStyle: {
    flex: 14,
    width: Dimensions.get("window").width,
    height: "100%",
  },
  getPosition: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  bottomMenu: {
    width: "100%",
  },
  findFriends: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "lightgrey",
  },
});
