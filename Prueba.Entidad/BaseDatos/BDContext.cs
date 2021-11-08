using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Prueba.Entidad.Especificas;

#nullable disable

namespace Prueba.Entidad.BaseDatos
{
    public partial class BDContext : DbContext
    {
        public BDContext()
        {
        }

        public BDContext(DbContextOptions<BDContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<Cupon> Cupons { get; set; }

        //FuncionesEntidades
        //public virtual DbSet<Entidad_DataSessionMenu> Entidad_ListarMenuPadre { get; set; }



        //FinFuncionesEntidades



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=Prueba;User Id=sa; password=123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            //FuncionesEntidades
            //modelBuilder.Entity<Entidad_ListaCupon>().HasNoKey().ToTable("Entidad_ListaCupon", t => t.ExcludeFromMigrations(true));

            //FinFuncionesEntidades

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("Cliente");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");


                entity.Property(e => e.NombreCompleto)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                  .IsRequired()
                  .HasMaxLength(100)
                  .IsUnicode(true);

                entity.HasOne(d => d.Cupons)
                  .WithOne(p => p.Clientes)
                  .HasForeignKey<Cupon>(d => d.IdCliente)
                  .HasConstraintName("FK_Cupon_Cliente");

            });

            modelBuilder.Entity<Cupon>(entity =>
            {
                entity.ToTable("Cupon");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");


                entity.Property(e => e.CodCuponGenerado)
                    .IsRequired()                   
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreado)
                  .HasColumnType("datetime")
                  .HasColumnName("Fecha_Creado");

                entity.Property(e => e.FechaCanjeado)
                  .HasColumnType("datetime")
                  .HasColumnName("Fecha_Canjeado");

                entity.Property(e => e.IdCliente).HasColumnName("ID_Cliente");              


            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
