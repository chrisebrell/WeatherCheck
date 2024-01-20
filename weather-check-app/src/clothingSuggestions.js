// clothingSuggestions.js
const suggestClothing = (temperature, description) => {
    if (temperature < 32) {
      return 'It\'s very cold. Bundle up with multiple layers, a heavy jacket, scarf, gloves, and a hat.';
    } else if (temperature >= 32 && temperature < 50) {
      return 'It\'s cold. Wear a warm jacket, layers, and don\'t forget your gloves.';
    } else if (temperature >= 50 && temperature < 68) {
      if (description.toLowerCase().includes('rain')) {
        return 'It\'s cool with rain. Wear a waterproof jacket and bring an umbrella.';
      } else {
        return 'It\'s cool. Consider wearing a sweater or light jacket.';
      }
    } else if (temperature >= 68 && temperature < 80) {
      if (description.toLowerCase().includes('rain')) {
        return 'It\'s mild with rain. Wear a light rain jacket and comfortable clothes.';
      } else {
        return 'It\'s mild. Dress in light layers, a t-shirt, and jeans.';
      }
    } else if (temperature >= 80 && temperature < 90) {
      if (description.toLowerCase().includes('rain')) {
        return 'It\'s warm with rain. Wear light, breathable clothes and carry a small umbrella.';
      } else {
        return 'It\'s warm. Opt for shorts, a t-shirt, and sunglasses.';
      }
    } else {
      if (description.toLowerCase().includes('thunderstorm')) {
        return 'There\'s a thunderstorm. Stay indoors, and avoid going outside.';
      } else if (description.toLowerCase().includes('snow')) {
        return 'It\'s snowy. Dress warmly with a winter coat, boots, and layers.';
      } else {
        return 'It\'s hot. Wear light and breathable clothing like shorts, a tank top, and a hat.';
      }
    }
  };
  
  export default suggestClothing;
  