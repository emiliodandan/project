using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace Identity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdendityController : ControllerBase
    {
        private const string TokenSecret = "SecretKey";
        private static readonly TimeSpan TokenLifeTime = TimeSpan.FromHours(4);

        [HttpPost("token")]
        public IActionResult GenerateToken([FromBody] TokenGenerationRequest request)
        {
            var TokenHandler = new JwtSecurityTokenHandler();
            var Key = Encoding.UTF8.GetBytes(TokenSecret);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, request.Email),
                new(JwtRegisteredClaimNames.Email, request.Email),
                new("userId", request.UserId.ToString()),
            };

            foreach (var chainPair in request.CustomClaims)
            {
                var jsonElement = (JsonElement)chainPair.Value;
                var valueType = jsonElement.ValueKind switch
                {
                    JsonValueKind.True => ClaimValueTypes.Boolean,
                    JsonValueKind.False => ClaimValueTypes.Boolean,
                    JsonValueKind.Number => ClaimValueTypes.Double,
                    _ => ClaimValueTypes.String,
                }
            }
        }

    }
}
