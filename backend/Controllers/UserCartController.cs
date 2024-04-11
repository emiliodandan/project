using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserCartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("AddToCart")]
        public async Task<ActionResult> AddToCart([FromBody] UserCartDto dto)
        {
            var userCart = new UserCart()
            {
                MediaId = dto.MediaId,
                UserId = dto.UserId,
                DateAdded = DateTime.Now,
            };
            await _context.UserCarts.AddAsync(userCart);
            await _context.SaveChangesAsync();

            return Ok("Added item to user cart");
        }

        [HttpGet("GetCartItems/{id}")]
        public async Task<ActionResult<List<UserCart>>> GetUserCartByUserId([FromRoute] int id)
        {
            var cartItems = await _context.UserCarts
                                        .Where(i => i.UserId == id)
                                        .OrderByDescending(i => i.DateAdded) // Assuming Id is the property to order by
                                        .ToListAsync();

            if (cartItems is null)
            {
                return NotFound("Cart not found");
            }

            return Ok(cartItems);
        }


        [HttpDelete("DeleteCartItem/{userId}/{mediaId}")]
        public async Task<ActionResult> DeleteItemByMediaId([FromRoute] int userId, [FromRoute] int mediaId)
        {
            var cartItem = await _context.UserCarts.FirstOrDefaultAsync(i => i.UserId == userId && i.MediaId == mediaId);
            if (cartItem is null)
            {
                return NotFound("Cart Not Found");
            }
            _context.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Item removed");
        }

        [HttpDelete("DeleteAllItems/{id}")]
        public async Task<ActionResult<List<UserCart>>> DeleteAllItems([FromRoute] int id)
        {
            var cartItems = await _context.UserCarts.Where(i => i.UserId == id).ToListAsync();
            if (cartItems.Count == 0)
            {
                return NotFound("Cart Not Found");
            }

            _context.UserCarts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok("All items removed");
        }


        [HttpPatch("AddRanking/{userId}/{cartItemId}/{rankId}")]
        public async Task<ActionResult> AddRanking([FromRoute] int userId, [FromRoute] int cartItemId, [FromRoute] int rankId)
        {
            var rank = await _context.UserCarts.FirstOrDefaultAsync(u => u.UserId == userId && u.MediaId == cartItemId);
            if (rank is null)
            {
                return NotFound("Item not found");
            }
            
            rank.Ranking = rankId;

            await _context.SaveChangesAsync();
            return Ok("Added ranking");
        }

        [HttpDelete("DeleteCartItem/{id}")]
        public async Task<ActionResult> DeleteCartItem([FromRoute] int id)
        {
            var cartItem = await _context.UserCarts.FirstOrDefaultAsync(c => c.CartItemId == id);
            if (cartItem is null)
            {
                return NotFound("Item not found");
            }

            _context.UserCarts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Item deleted");
        }

        [HttpGet("GetRankings/{id}")]
        public async Task<ActionResult<List<object>>> GetRankings([FromRoute] int id)
        {
            var rankings = await _context.UserCarts
                .Include(u => u.Media)
                .Where(u => u.UserId == id)
                .OrderByDescending(u => u.Ranking)
                .Select(u => new
                {
                    Cover = u.Media.Cover, 
                    Ranking = u.Ranking
                })
                .ToListAsync();

            if (rankings == null)
            {
                return NotFound("Not found");
            }

            return Ok(rankings);
        }



    }
}
