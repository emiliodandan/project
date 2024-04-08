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
            };
            await _context.UserCarts.AddAsync(userCart);
            await _context.SaveChangesAsync();

            return Ok("Added item to user cart");
        }

        [HttpGet("GetCartItem/{id}")]
        public async Task<ActionResult> GetUserCartByUserId([FromRoute] int id)
        {
            var cartItem = await _context.UserCarts.FirstOrDefaultAsync(i => i.UserId == id);
            if (cartItem is null)
            {
                return NotFound("Cart not found");
            }
            return Ok(cartItem);
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



    }
}
