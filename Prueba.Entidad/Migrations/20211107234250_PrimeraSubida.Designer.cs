﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Prueba.Entidad.BaseDatos;

namespace Prueba.Entidad.Migrations
{
    [DbContext(typeof(BDContext))]
    [Migration("20211107234250_PrimeraSubida")]
    partial class PrimeraSubida
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Prueba.Entidad.BaseDatos.Cliente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("NombreCompleto")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Cliente");
                });

            modelBuilder.Entity("Prueba.Entidad.BaseDatos.Cupon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CodCuponGenerado")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<DateTime?>("FechaCanjeado")
                        .HasColumnType("datetime")
                        .HasColumnName("Fecha_Canjeado");

                    b.Property<DateTime>("FechaCreado")
                        .HasColumnType("datetime")
                        .HasColumnName("Fecha_Creado");

                    b.Property<int>("IdCliente")
                        .HasColumnType("int")
                        .HasColumnName("ID_Cliente");

                    b.HasKey("Id");

                    b.HasIndex("IdCliente")
                        .IsUnique();

                    b.ToTable("Cupon");
                });

            modelBuilder.Entity("Prueba.Entidad.BaseDatos.Cupon", b =>
                {
                    b.HasOne("Prueba.Entidad.BaseDatos.Cliente", "Clientes")
                        .WithOne("Cupons")
                        .HasForeignKey("Prueba.Entidad.BaseDatos.Cupon", "IdCliente")
                        .HasConstraintName("FK_Cupon_Cliente")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Clientes");
                });

            modelBuilder.Entity("Prueba.Entidad.BaseDatos.Cliente", b =>
                {
                    b.Navigation("Cupons");
                });
#pragma warning restore 612, 618
        }
    }
}
