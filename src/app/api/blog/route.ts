import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export async function GET() {
  try {
    const response = await fetch('https://note.com/tamo2918/rss', {
      next: { revalidate: 3600 } // 1時間ごとにキャッシュを更新
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xmlData = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      isArray: (name) => ['item'].includes(name)
    });
    
    const result = parser.parse(xmlData);
    const items = result.rss.channel.item;
    
    // 必要なデータを抽出して整形
    const posts = items.slice(0, 3).map((item: any) => {
      // media:thumbnailから画像URLを取得
      let imageUrl = '';
      if (item['media:thumbnail']) {
        imageUrl = item['media:thumbnail'];
        
        // クエリパラメータを削除して画像URLをクリーンにする
        if (imageUrl.includes('?')) {
          imageUrl = imageUrl.split('?')[0];
        }
      }

      // 説明文からHTMLタグを削除し、冒頭の一部を抽出
      let excerpt = '';
      if (item.description) {
        // HTMLタグを削除
        excerpt = item.description.replace(/<[^>]*>/g, '');
        // 先頭の「はじめに」を削除
        excerpt = excerpt.replace(/^はじめに\s+/, '');
        // 100文字程度に制限して「...」を追加
        excerpt = excerpt.substring(0, 100) + '...';
      }
      
      return {
        id: item.link.split('/').pop(),
        title: item.title,
        excerpt: excerpt,
        publishedAt: item.pubDate,
        url: item.link,
        thumbnailUrl: imageUrl
      };
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 