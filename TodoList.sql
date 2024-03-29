USE [TodoList]
GO
/****** Object:  Table [dbo].[tblTodoList]    Script Date: 18.04.2022 22:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTodoList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Priority] [nvarchar](15) NOT NULL,
 CONSTRAINT [PK_TodoList] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tblTodoList] ON 

INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (5, N'DDDDaaaaaabbbb', N'Önemli')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (6, N'mustafa', N'Normal')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (7, N'gedik', N'Normal')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (8, N'Nihayaya', N'Önemli')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (10, N'Nali', N'Normal')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (11, N'Merhaba', N'Önemli')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (12, N'Selamlar', N'Normal')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (15, N'aaaaannnnnbbbbbbbzz', N'Normal')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (23, N'asdasda', N'Normal')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (24, N'asdasda', N'Önemli')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (25, N'ssssss', N'Normal')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (26, N'aaaaaaaaaaa', N'Önemli')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (27, N'asdsadas111111', N'Önemli')
INSERT [dbo].[tblTodoList] ([Id], [Name], [Priority]) VALUES (28, N'asdasdas', N'Önemli')
SET IDENTITY_INSERT [dbo].[tblTodoList] OFF
GO
