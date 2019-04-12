exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('vgames')
    .truncate()
    .then(function() {
      return knex('vgames').insert([
        { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 },
        { title: 'Mario Brothers', genre: 'Platform Game', releaseYear: 1983 },
        { title: 'Mortal Kombat', genre: 'Action-Adventure', releaseYear: 1992 }
      ]);
    });
};
