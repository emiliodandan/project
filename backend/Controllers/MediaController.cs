using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                NbPages = dto.NbPages
                
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
                DurationMinutes = dto.DurationMinutes
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
    }
}
