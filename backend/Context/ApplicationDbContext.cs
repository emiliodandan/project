using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Ranking> Rankings { get; set; }
        public DbSet<UserCart> UserCarts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ranking>()
                .HasOne(r => r.UserCart)
                .WithOne(uc => uc.Ranking)
                .HasForeignKey<Ranking>(r => r.UserCartId);
        }
    }
}