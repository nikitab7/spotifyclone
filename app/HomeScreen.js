// HomeScreen.js
import {
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { useSpotifyAuth, useSpotifyTracks } from "../utils";
import { Themes } from "../assets/Themes";
import React from "react";
import Song from "../utils/Song";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  const { tracks, loading, handleEndReached } = useSpotifyTracks(token);

  const renderSong = ({ item, index }) => {
    return (
      <Song
        index={index + 1}
        imageUrl={item.imageUrl}
        externalUrl={item.externalUrl}
        title={item.songTitle}
        artists={item.songArtists}
        albumName={item.albumName}
        duration={item.duration}
        previewUrl={item.previewUrl}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {token && (
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/spotify-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>My Top Tracks</Text>
        </View>
      )}

      <View style={styles.connectContainer}>
        {token ? null : (
          <Pressable style={styles.button} onPress={() => getSpotifyAuth()}>
            <Image
              source={require("../assets/spotify-logo.png")}
              style={styles.logo}
            />
            <Text style={styles.buttonText}>CONNECT WITH SPOTIFY</Text>
          </Pressable>
        )}
      </View>
      {tracks && (
        <FlatList
          style={styles.flatList}
          data={tracks}
          renderItem={renderSong}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={handleEndReached}
          ListFooterComponent={
            loading && <ActivityIndicator size="small" color="#0000ff" />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  connectContainer: {
    marginBottom: 16,
  },

  button: {
    backgroundColor: Themes.colors.spotify,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 25,
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },

  flatList: {
    flex: 1,
    width: "100%",
  },
});
