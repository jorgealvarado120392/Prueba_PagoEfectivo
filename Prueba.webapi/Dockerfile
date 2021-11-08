#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Prueba.webapi/Prueba.webapi.csproj", "Prueba.webapi/"]
COPY ["Prueba.Datos/Prueba.Datos.csproj", "Prueba.Datos/"]
COPY ["Prueba.Utilidades/Prueba.Utilidades.csproj", "Prueba.Utilidades/"]
COPY ["Prueba.Servicios/Prueba.Servicios.csproj", "Prueba.Servicios/"]
COPY ["Prueba.Entidad/Prueba.Entidad.csproj", "Prueba.Entidad/"]
RUN dotnet restore "Prueba.webapi/Prueba.webapi.csproj"
COPY . .
WORKDIR "/src/Prueba.webapi"
RUN dotnet build "Prueba.webapi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Prueba.webapi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Prueba.webapi.dll"]