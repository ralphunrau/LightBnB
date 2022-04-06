INSERT INTO users (id, name, email, password) VALUES
(1, 'Eva Stanley', 'evastanley@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Louisa Meyer', 'louisameyer@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Dominic Park', 'dominicpark@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(4, 'Sue Luna', 'sueluna@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(5, 'Rosalie Garza', 'rosalie@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
;

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES
(1, 3, 'Safe Haven', 'Noice', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 3, 2, 3, 'Canada', 'Cordova Street', 'Toronto', 'Ontario', 'P4L 5R2', FALSE),
(2, 3, 'Unsafe Haven', 'Decent', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 2389, 0, 0, 1, 'United States of America', 'Hollywood Boulevard', 'Los Angeles', 'California', '5RT9B', FALSE),
(3, 5, 'Extremely Safe Haven', 'Very safe', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 10589, 4, 3, 6, 'Canada', 'George Ferguson Way', 'Abbotsford', 'British Columbia', 'V2D 8K3', TRUE)
;

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) VALUES
(1, '2020-07-04', '2020-07-21', 2, 1),
(2, '2021-12-06', '2021-12-24', 1, 2),
(3, '2021-11-15', '2022-11-15', 3, 4)
;

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) VALUES
(1, 1, 2, 1, 8, 'Great!'),
(2, 2, 1, 2, 2, 'Terrible!'),
(3, 4, 3, 3, 10, 'Perfect!')
;