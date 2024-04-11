namespace backend.Dtos
{
    public class MovieDto
    {
        public string MediaType { get; set; }
        public string Title { get; set; }
        public string Creator { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; }
        public int DurationMinutes { get; set; }
        public int Year {  get; set; }
        public DateTime DateAdded { get; set; }

    }
}
