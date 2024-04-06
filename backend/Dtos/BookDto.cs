using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class BookDto
    {
        public string MediaType { get; set; }
        public string Title { get; set; }
        public string Creator { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; }
        public int NbPages { get; set; }
        public int Year { get; set; }
    }
}
