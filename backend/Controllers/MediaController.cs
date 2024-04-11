using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MediaController(ApplicationDbContext context)
        {
            _context = context;
        }

        //Create - Read - Update - Delete
        [HttpPost("CreateBook")]
        //create a book
        public async Task<ActionResult> CreateBook([FromBody] BookDto dto)
        {
            var book = new Book()
            {
                MediaType = "Book",
                Title = dto.Title,
                Creator = dto.Creator,
                Year = dto.Year,
                Cover = dto.Cover,
                Description = dto.Description,
                NbPages = dto.NbPages,
                DateAdded = DateTime.Now
            };

            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();

            return Ok("Book added!");
        }

        [HttpPost("CreateMovie")]
        //create a Movie
        public async Task<ActionResult> CreateMovie([FromBody] MovieDto dto)
        {
            var movie = new Movie()
            {
                MediaType = "Movie",
                Creator = dto.Creator,
                Title = dto.Title,
                Year = dto.Year,
                Description = dto.Description,
                Cover = dto.Cover,
                DurationMinutes = dto.DurationMinutes,
                DateAdded = DateTime.Now
            };

            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();

            return Ok("Movie Added!");
        }

        //read all Books
        [HttpGet("GetAllBooks")]
        public async Task<ActionResult<List<Book>>> GetAllBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        //read all movies
        [HttpGet("GetAllMovies")]
        public async Task<ActionResult<List<Movie>>> GetAllMovies()
        {
            var movies = await _context.Movies.ToListAsync();
            return Ok(movies);
        }

        [HttpGet("GetBookById/{id}")]
        public async Task<ActionResult<Media>> GetBookById([FromRoute] int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.MediaId == id);
            if (book == null)
            {
                return NotFound("Book not found");
            }
            return Ok(book);
        }

        [HttpGet("GetMovieById/{id}")]
        public async Task<ActionResult<Media>> GetMovieById([FromRoute] int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.MediaId == id);
            if (movie == null)
            {
                return NotFound("Movie not found");
            }
            return Ok(movie);
        }

        [HttpPatch("UpdateBook/{id}")]
        public async Task<ActionResult> UpdateBook([FromRoute] int id, [FromBody] BookDto dto)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.MediaId == id);
            if (book is null)
            {
                return NotFound("Book not found");
            }

            if (dto.Title != null)
            {
                book.Title = dto.Title;
            }
             if (dto.Description != null)
            {
                book.Description = dto.Description;
            }
             if (dto.Creator != null)
            {
                book.Creator = dto.Creator;
            }
             if (dto.Year != 0)
            {
                book.Year = dto.Year;
            }
             if (dto.NbPages != 0)
            {
                book.NbPages = dto.NbPages;
            }
            if (dto.Cover != null)
            {
                book.Cover = dto.Cover;
            }
            else
            {
                return BadRequest("No fields provided for update");
            }
            book.DateAdded = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok("Book updated");
           
        }

        [HttpPatch("UpdateMovie/{id}")]
        public async Task<ActionResult> UpdateMovie([FromRoute] int id, [FromBody] MovieDto dto)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(b => b.MediaId == id);
            if (movie is null)
            {
                return NotFound("Movie not found");
            }

            if (dto.Title != null)
            {
                movie.Title = dto.Title;
            }
            if (dto.Description != null)
            {
                movie.Description = dto.Description;
            }
            if (dto.Creator != null)
            {
                movie.Creator = dto.Creator;
            }
            if (dto.Year != 0)
            {
                movie.Year = dto.Year;
            }
            if (dto.DurationMinutes != 0)
            {
                movie.DurationMinutes = dto.DurationMinutes;
            }
            if (dto.Cover != null)
            {
                movie.Cover = dto.Cover;
            }
            else
            {
                return BadRequest("No fields provided for update");
            }

            movie.DateAdded = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok("Movie updated");
        }


        [HttpDelete("DeleteBook/{id}")]
        public async Task<ActionResult> DeleteBook([FromRoute] int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.MediaId == id);
            if (book is null)
            {
                return NotFound("Book not found");
            }

            _context.Remove(book);
            await _context.SaveChangesAsync();

            return Ok("Book deleted");
        }


        [HttpDelete("DeleteMovie/{id}")]
        public async Task<ActionResult> DeleteMovie([FromRoute] int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.MediaId == id);
            if (movie is null)
            {
                return NotFound("Movie not found");
            }

            _context.Remove(movie);
            await _context.SaveChangesAsync();

            return Ok("Movie deleted");
        }

        [HttpGet("GetNewBooks")]
        public async Task<ActionResult<List<Book>>> GetNewBooks()
        {
            var oneWeek = DateTime.Today.AddDays(-7);
            var newBookReleases = _context.Books.Where(b => b.DateAdded > oneWeek);
            if (newBookReleases is null)
            {
                return NotFound("No new releases. Stay tuned");
            }
            return Ok(newBookReleases);
        }

        [HttpGet("GetNewMovies")]
        public async Task<ActionResult<List<Movie>>> GetNewMovies()
        {
            var oneWeek = DateTime.Today.AddDays(-7);
            var newMovieReleases = _context.Movies.Where(m => m.DateAdded > oneWeek);
            if (newMovieReleases is null)
            {
                return NotFound("No new releases. Stay tuned");
            }
            return Ok(newMovieReleases);
        }

        [HttpGet("GetCartItems2/{userId}")]
        public async Task<ActionResult<IEnumerable<UserCart>>> GetCartItems(int userId, string mediaType)
        {
            // Check if mediaType parameter is provided and valid
            if (string.IsNullOrWhiteSpace(mediaType))
            {
                // If mediaType parameter is not provided, return all cart items for the user
                var cartItems = await _context.UserCarts
                    .Where(cart => cart.UserId == userId)
                    .Include(cart => cart.Media)
                    .ToListAsync();

                return Ok(cartItems);
            }
            else
            {
                // If mediaType parameter is provided, filter cart items by media type
                var cartItems = await _context.UserCarts
                    .Where(cart => cart.UserId == userId && cart.Media.MediaType == mediaType)
                    .Include(cart => cart.Media)
                    .ToListAsync();

                return Ok(cartItems);
            }
        }
    }
}
