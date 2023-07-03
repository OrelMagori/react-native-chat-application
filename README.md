# React Native Chat & Map Application with Google Maps API

This is a React Native project that provides a chat and map application using the Google Maps API. Users can chat with each other and view a map to share and explore different locations.

## Prerequisites

- Node.js and npm should be installed on your machine.
- Expo CLI should be installed globally.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to install dependencies:


4. Set up your Google Maps API key by following these steps:

- Create a project on the Google Cloud Platform Console.
- Enable the Maps JavaScript API for your project.
- Obtain an API key.
- Create a `.env` file in the project root directory and add the following environment variable:

  ```
  GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
  ```

  Replace `<your_google_maps_api_key>` with your actual API key.

## Usage

1. Start the project with the following command:


2. Connect a physical device or start an emulator/simulator.

3. Use the Expo app (available on [iOS](https://apps.apple.com/us/app/expo-go/id982107779) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)) to scan the QR code displayed in the terminal or in the browser Metro Bundler interface.

4. The app will open on your device/emulator, displaying a chat interface and a map.

5. You can use the chat functionality to send and receive messages with other users.

6. The map allows you to explore different locations, view markers, and interact with various map features.
