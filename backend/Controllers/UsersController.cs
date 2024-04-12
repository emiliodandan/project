using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("AddUser")]
        public async Task<ActionResult> AddUser([FromBody] UserDto dto)
        {
            var user = new User()
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password,
                IsAdmin = false,
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok("User added!");
        }

        [HttpGet("GetUsers")] //admin
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("GetUser/{id}")]
        public async Task<ActionResult<User>> GetUserById([FromRoute] int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
            if (user is null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpGet("GetUser/{userName}/{password}")]
        public async Task<ActionResult<User>> GetUserById([FromRoute] string userName, [FromRoute] string password)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userName && u.Password == password);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching user.");
            }
        }


        [HttpPatch("ChangeUserPassword/{id}")]
        public async Task<ActionResult> UpdatePassword([FromRoute] int id, [FromBody] UserDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
            if (user is null)
            {
                return NotFound("User not found");
            }
            if (dto.Password != null)
            {
                user.Password = dto.Password;
            }
            else
            {
                return BadRequest("No fields provided for update");
            }
            
            await _context.SaveChangesAsync();

            return Ok("User password updated");
        }

        [HttpDelete("DeleteUser/{id}")] //admin
        public async Task<ActionResult> UpdatePassword([FromRoute] int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
            if (user is null)
            {
                return NotFound("User not found");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("User deleted successfully");
        }




    }
}
