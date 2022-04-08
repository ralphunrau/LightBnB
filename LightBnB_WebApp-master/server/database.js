const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      if (result.rows.length === 0) {
        /* console.log(result); */
        return null;
      }
      /* console.log(result); */
      return(result.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        /* console.log(result.rows[0]); */
        return null;
      }
      return(result.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  /* const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user); */

  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) 
    RETURNING *`, [user.name, user.email, user.password])
    .then((result) => {
      console.log(result.rows[0])
      return(result.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
 const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
    `SELECT reservations.*, properties.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    JOIN property_reviews ON reservations.id = property_reviews.reservation_id
    WHERE reservations.guest_id = $1
    AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2`, [guest_id, limit])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


 const getAllProperties = function (options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  FULL OUTER JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city ILIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(parseInt(options.minimum_price_per_night));
    queryString += `AND cost_per_night >= $${queryParams.length}`;
    queryParams.push(parseInt(options.maximum_price_per_night));
    queryString += `AND cost_per_night <= $${queryParams.length}`;
  }

  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating));
    queryString += `HAVING avg(rating) >= $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
`;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then((result) => result.rows);
};



exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  /* const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property); */

  return pool
    .query(
    `
    INSERT INTO properties(
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    ) VALUES (
      '${property.owner_id}', '${property.title}', '${property.description}', '${property.thumbnail_photo_url}', '${property.cover_photo_url}', '${property.cost_per_night}', '${property.street}', '${property.city}', '${property.province}', '${property.post_code}', '${property.country}', '${property.parking_spaces}', '${property.number_of_bathrooms}', '${property.number_of_bedrooms}'
    ) RETURNING *;
    `)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addProperty = addProperty;
