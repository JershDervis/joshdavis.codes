import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
};

export const get = async ({
  params,
  request
}: {
  params: Record<string, number | string | any>;
  request: Request;
}) => {
  return new Response(
    JSON.stringify({ success: false, message: 'Try a POST request' }),
    {
      status: 404
    }
  );
};

export const post = async ({
  params,
  request
}: {
  params: Record<string, number | string | any>;
  request: Request;
}) => {
  try {
    if (
      request.headers.get('authorization') ===
      `Bearer ${import.meta.env.API_SECRET_KEY}`
    ) {
      let response = await fetch(
        `https://api.github.com/users/${import.meta.env.GITHUB_USERNAME}/repos`
      );
      if (response.status === 200) {
        let resData = await response.json();
        // Upsert many records at a time
        const upsert = await prisma.$transaction(
          resData.map((repo: Repo) =>
            prisma.repository.upsert({
              create: {
                repoId: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at
              },
              update: {
                repoId: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at
              },
              where: { repoId: repo.id }
            })
          )
        );
        return new Response(JSON.stringify({ success: true }), {
          status: 200
        });
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Request to Github failed',
            response
          }),
          {
            status: 404
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid API key'
        }),
        {
          status: 401
        }
      );
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      {
        status: 500
      }
    );
  }
};
