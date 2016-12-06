using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(D3app.Startup))]
namespace D3app
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
