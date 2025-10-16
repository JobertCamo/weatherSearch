module.exports = async (req, res) => {
  const { city } = req.query;
  const accessKey = '7083b6b8eab933742ebd3055ed98ecc4';
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
