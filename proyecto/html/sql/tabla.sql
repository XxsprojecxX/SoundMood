-- tabla.sql

CREATE TABLE IF NOT EXISTS Vinilos (
    id INTEGER PRIMARY KEY,
    img TEXT,
    duration TEXT,
    price TEXT
);

INSERT INTO Vinilos (img, duration, price) VALUES
    ('img/album1.jpg', '3:45', '$10'),
    ('img/album2.jpg', '4:10', '$12'),
    ('img/album3.jpg', '3:20', '$8');
