const Movie = require("../models/Movie");
const User = require("../models/User");
// Create Movie
exports.createMovie = async (req, res) => {
  const { name, startDate, endDate, seatsAvailable } = req.body;

  const movie = new Movie({
    name,
    startDate,
    endDate,
    seatsAvailable,
    owner: req.owner._id,
  });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
};

// Update Movie
exports.updateMovie = async (req, res) => {
  const { name, startDate, endDate, seatsAvailable } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.name = name || movie.name;
    movie.startDate = startDate || movie.startDate;
    movie.endDate = endDate || movie.endDate;
    movie.seatsAvailable = seatsAvailable || movie.seatsAvailable;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
};
// Book Seats
exports.bookSeats = async (req, res) => {
  const { movieId, seats } = req.body;

  const movie = await Movie.findById(movieId);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const currentDate = new Date();
  if (currentDate < movie.startDate || currentDate > movie.endDate) {
    return res.status(400).json({ message: "Movie is not active" });
  }

  if (movie.seatsBooked + seats > movie.seatsAvailable) {
    return res.status(400).json({ message: "Not enough seats available" });
  }

  movie.seatsBooked += seats;

  await movie.save();

  const user = await User.findById(req.user._id);
  const existingBooking = user.bookings.find(
    (booking) => booking.movie.toString() === movieId
  );

  if (existingBooking) {
    existingBooking.seatsBooked += seats;
  } else {
    user.bookings.push({ movie: movieId, seatsBooked: seats });
  }

  await user.save();

  res.json({ message: "Seats booked successfully" });
};
