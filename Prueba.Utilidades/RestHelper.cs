using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prueba.Utilidades
{
    public static class RestHelper<TRequest, TResponse>
         where TRequest : class
         where TResponse : class, new()
    {
        public static TResponse Execute(string metodo, TRequest request)
        {
            var client = new RestClient("http://localhost:81/api");
            client.Timeout=50000;
            var restRequest = new RestRequest(metodo, Method.POST)
            {
                RequestFormat = DataFormat.Json,

            };

            restRequest.AddJsonBody(request);


            var restResponse = client.Execute<TResponse>(restRequest);

            TResponse data = restResponse.Data;

            return data;
        }

    }
}
