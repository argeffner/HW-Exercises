-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around TEXT NOT NULL,
  galaxy TEXT NOT NULL,
  moons TEXT[]
);

INSERT INTO planets
  (name, orbital_period_in_years, orbits_around, galaxy, moons)
VALUES
  ('Mercury', 0.24, 'The Sun', 'Milky Way', '{}'),
  ('Venus', 0.62, 'The Sun', 'Milky Way', '{}'),
  ('Earth', 1.00, 'The Sun', 'Milky Way', '{"The Moon"}'),
  ('Mars', 1.88, 'The Sun', 'Milky Way', '{"Phobos", "Deimos"}'),
  ('Ceres (dwarf)', 4.6, 'The Sun', 'Milky Way', '{}'),
  ('Jupiter', 12, 'The Sun', 'Milky Way', '{"Io","Ganymede","Europa","Callisto"}'),
  ('Saturn', 29, 'The Sun', 'Milky Way', '{"Titan","Dione","Enceladus","Hyperion","Iapetus","Mimas","Rhea","Tethys"}'),
  ('Uranus', 84, 'The Sun', 'Milky Way', '{"Ariel","Miranda","Titania","Oberon","Umbriel"}'),
  ('Neptune', 164.8, 'The Sun', 'Milky Way', '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
  ('Pluto (dwarf)', 248, 'The Sun', 'Milky Way', '{"Charon","Nix","Hydra","Kerberos","Styx"}'),
  ('Haumea (dwarf)', 281.9, 'The Sun', 'Milky Way', '{"Hiiaka","Namaka"}'),
  ('Makemake (dwarf)', 305.3, 'The Sun', 'Milky Way', '{"MK 2"}'),
  ('Eris (dwarf)', 561, 'The Sun', 'Milky Way', '{"Dysnomia"}'),
  ('Proxima Centauri b', 0.03, 'Proxima Centauri', 'Milky Way', '{}'),
  ('Gliese 876 b', 0.23, 'Gliese 876', 'Milky Way', '{}');