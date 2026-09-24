/**
 * Every word, number and image path on the site lives here, taken from the office's brief
 * ("Qng - Thông tin làm website"). Anything still waiting on the office is marked "CHỜ".
 * Images come from the Lorenza reference template and are placeholders: swap the file in
 * /public/images or change the path here.
 *
 * GEO: AI answer engines quote this text verbatim, so every fact here must be true. Legal
 * explanations (services, FAQs, articles) must be reviewed by the Trưởng Văn phòng before launch.
 */

/** Production origin, used for canonical URLs, the sitemap and structured data. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const office = {
  fullName: "Văn phòng Thi hành án dân sự Doanh nghiệp tư nhân Quảng Ngãi",
  name: "Văn phòng Thi hành án dân sự Quảng Ngãi",
  shortName: "Văn phòng THADS Quảng Ngãi",
  slogan: "Tận tâm trong từng giải pháp",
  description:
    "Văn phòng Thi hành án dân sự Quảng Ngãi thực hiện 4 chức năng của Thừa hành viên (trước đây gọi là Thừa phát lại): tống đạt, lập vi bằng, xác minh điều kiện thi hành án dân sự và tổ chức thi hành án dân sự tại tỉnh Quảng Ngãi.",
  taxId: "4300930691",
  legalForm: "Doanh nghiệp tư nhân",
  foundingDate: "2026-07-13",
  foundingLabel: "13/07/2026",
  head: "Nguyễn Thành Tín",
  phone: "0984 816 599",
  phoneHref: "tel:+84984816599",
  phoneIntl: "+84984816599",
  zaloHref: "https://zalo.me/0984816599",
  email: "vpthadsquangngai@gmail.com",
  address: "26 Phạm Văn Đồng, phường Cẩm Thành, tỉnh Quảng Ngãi",
  postalAddress: {
    streetAddress: "26 Phạm Văn Đồng",
    addressLocality: "Phường Cẩm Thành",
    addressRegion: "Tỉnh Quảng Ngãi",
    addressCountry: "VN",
  },
  // CHỜ: the office has not sent its Google Maps link yet; until then links search the address.
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "26 Phạm Văn Đồng, Cẩm Thành, Quảng Ngãi",
  )}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("26 Phạm Văn Đồng, Cẩm Thành, Quảng Ngãi")}&output=embed`,
  workdays: "Thứ 2 – Thứ 6",
  sessions: [
    { label: "Buổi sáng", time: "7h30 – 11h30", opens: "07:30", closes: "11:30" },
    { label: "Buổi chiều", time: "13h30 – 17h00", opens: "13:30", closes: "17:00" },
  ],
  hours: "Thứ 2 – Thứ 6: 7h30 – 11h30 và 13h30 – 17h00",
  timing: "7h30 – 11h30 · 13h30 – 17h00",
  areaServed: "Tỉnh Quảng Ngãi",
  credential: { top: "14 năm hành nghề", title: "Thừa hành viên" },
  socials: [
    {
      label: "Facebook",
      handle: "Thi hành án dân sự Quảng Ngãi",
      href: "https://www.facebook.com/profile.php?id=61590280959397",
      icon: "facebook",
    },
    { label: "TikTok", handle: "Thừa Hành Viên Quảng Ngãi", href: "https://www.tiktok.com/@vpthadsqng", icon: "tiktok" },
    { label: "Zalo", handle: "0984 816 599", href: "https://zalo.me/0984816599", icon: "zalo" },
  ],
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Kiến thức pháp lý", href: "/kien-thuc" },
  { label: "Đội ngũ", href: "/doi-ngu" },
];

/** The "Trang" dropdown in the header, same role as "Pages" in the reference. */
export const pagesNav: NavItem[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Liên hệ", href: "/lien-he" },
  { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
  { label: "Điều khoản sử dụng", href: "/dieu-khoan" },
];

export const footerNav = {
  pages: [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Dịch vụ", href: "/dich-vu" },
    { label: "Đội ngũ", href: "/doi-ngu" },
    { label: "Kiến thức pháp lý", href: "/kien-thuc" },
  ],
  more: [
    { label: "Liên hệ", href: "/lien-he" },
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Điều khoản sử dụng", href: "/dieu-khoan" },
  ],
};

export const highlights = ["Khách quan", "Chính xác", "Kịp thời", "Đúng quy định pháp luật", "Tận tâm trong từng giải pháp"];

export const stats = [
  { value: "21", label: "Năm kinh nghiệm pháp luật" },
  { value: "14", label: "Năm hành nghề Thừa hành viên" },
  { value: "4", label: "Chức năng theo luật định" },
];

export const checklist = [
  "Khách quan, chính xác, kịp thời",
  "Thực hiện đúng quy định pháp luật",
  "Thống nhất chi phí trước khi thực hiện",
];

export type Service = {
  slug: string;
  title: string;
  /** Lower-case noun phrase used inside sentences ("Khi nào cần lập vi bằng?"). */
  name: string;
  /** Two- or three-word label for tight spots, such as the row of links under the home hero. */
  label: string;
  summary: string;
  image: string;
  /** Answer-first definition: the sentence an AI engine should quote. */
  definition: string;
  overview: string[];
  useCases: string[];
  process: string[];
  notes: string[];
};

export const services: Service[] = [
  {
    slug: "tong-dat",
    title: "Tống đạt giấy tờ, hồ sơ, tài liệu",
    name: "tống đạt",
    label: "Tống đạt",
    summary: "Tống đạt văn bản của Tòa án, cơ quan thi hành án dân sự đúng trình tự, đúng thời hạn.",
    image: "/images/services/tong-dat.webp",
    definition:
      "Tống đạt là việc thông báo, giao giấy tờ, hồ sơ, tài liệu (như giấy triệu tập, thông báo, bản án, quyết định) cho người có liên quan theo đúng trình tự, thủ tục pháp luật quy định. Thừa hành viên thực hiện tống đạt theo yêu cầu của Tòa án và cơ quan thi hành án dân sự.",
    overview: [
      "Tống đạt đúng và kịp thời là điều kiện để các thủ tục tố tụng, thi hành án được tiến hành hợp lệ. Nếu văn bản không được tống đạt đúng thủ tục, quyền và nghĩa vụ của các bên có thể bị ảnh hưởng.",
      "Mỗi lần tống đạt đều được lập biên bản, ghi nhận thời gian, địa điểm, người nhận và phương thức tống đạt, sau đó báo cáo kết quả cho cơ quan yêu cầu.",
    ],
    useCases: [
      "Tòa án cần tống đạt giấy triệu tập, thông báo, bản án, quyết định cho đương sự",
      "Cơ quan thi hành án dân sự cần tống đạt quyết định, thông báo về thi hành án",
      "Người nhận vắng mặt tại nơi cư trú, cần thực hiện niêm yết theo quy định",
    ],
    process: [
      "Tiếp nhận văn bản cần tống đạt, kiểm tra thông tin và địa chỉ của người nhận.",
      "Tống đạt trực tiếp cho người nhận. Trường hợp không tống đạt trực tiếp được, Văn phòng thực hiện theo phương thức khác mà pháp luật cho phép, như niêm yết công khai.",
      "Lập biên bản tống đạt và báo cáo kết quả cho cơ quan yêu cầu.",
    ],
    notes: ["Biên bản tống đạt là căn cứ chứng minh văn bản đã được giao đúng thủ tục."],
  },
  {
    slug: "lap-vi-bang",
    title: "Lập vi bằng",
    name: "lập vi bằng",
    label: "Lập vi bằng",
    summary: "Ghi nhận sự kiện, hành vi có thật làm nguồn chứng cứ trong giao dịch và tranh chấp.",
    image: "/images/services/lap-vi-bang.webp",
    definition:
      "Vi bằng là văn bản do Thừa hành viên (trước đây gọi là Thừa phát lại) lập, ghi nhận sự kiện, hành vi có thật mà Thừa hành viên trực tiếp chứng kiến, theo yêu cầu của cá nhân, cơ quan, tổ chức. Vi bằng là nguồn chứng cứ để Tòa án xem xét khi giải quyết vụ việc và là căn cứ để thực hiện giao dịch theo quy định pháp luật.",
    overview: [
      "Vi bằng giúp người yêu cầu tạo lập và bảo vệ chứng cứ ngay tại thời điểm sự kiện xảy ra, hạn chế rủi ro tranh chấp về sau.",
      "Vi bằng chỉ ghi nhận sự kiện, hành vi có thật; vi bằng không thay thế văn bản công chứng, chứng thực và không xác nhận tính hợp pháp của giao dịch.",
      "Sau khi lập, vi bằng được đăng ký theo quy định và bàn giao cho người yêu cầu cùng hướng dẫn sử dụng, lưu giữ.",
    ],
    useCases: [
      "Giao nhận tiền, tài sản, giấy tờ giữa các bên",
      "Hiện trạng nhà, đất, công trình trước khi xây dựng, sửa chữa, cho thuê hoặc bàn giao",
      "Hành vi xây dựng lấn chiếm, gây thiệt hại cho nhà ở, tài sản liền kề",
      "Nội dung tin nhắn, email, website, bài đăng trên mạng xã hội",
      "Việc thông báo, gửi văn bản, yêu cầu thực hiện nghĩa vụ",
      "Diễn biến cuộc họp, đại hội, sự kiện của doanh nghiệp",
      "Việc một bên từ chối hoặc không thực hiện công việc đã cam kết",
    ],
    process: [
      "Tiếp nhận yêu cầu, trao đổi mục đích sử dụng vi bằng để xác định đúng và đủ nội dung cần ghi nhận.",
      "Kiểm tra giấy tờ liên quan, thống nhất thời gian, địa điểm và chi phí trước khi thực hiện.",
      "Thừa hành viên có mặt, trực tiếp chứng kiến và ghi nhận sự kiện, hành vi bằng văn bản, kèm hình ảnh, tài liệu khi cần.",
      "Hoàn thiện, đăng ký vi bằng theo quy định và bàn giao cho người yêu cầu.",
    ],
    notes: [
      "Không lập vi bằng đối với những việc thuộc thẩm quyền công chứng, chứng thực.",
      "Không dùng vi bằng để hợp thức hóa việc chuyển nhượng nhà, đất không đủ điều kiện theo quy định.",
    ],
  },
  {
    slug: "xac-minh-dieu-kien-thi-hanh-an",
    title: "Xác minh điều kiện thi hành án dân sự",
    name: "xác minh điều kiện thi hành án",
    label: "Xác minh điều kiện",
    summary: "Xác minh tài sản, thu nhập và điều kiện thi hành án của người phải thi hành án.",
    image: "/images/services/service-2.webp",
    definition:
      "Xác minh điều kiện thi hành án dân sự là việc Thừa hành viên làm rõ tài sản, thu nhập, tài khoản và các điều kiện khác của người phải thi hành án, theo yêu cầu của đương sự. Kết quả được lập thành văn bản, làm căn cứ để đương sự yêu cầu thi hành án hoặc lựa chọn phương án tiếp theo.",
    overview: [
      "Một bản án có hiệu lực chỉ thi hành được khi người phải thi hành án có điều kiện thi hành. Xác minh sớm giúp người được thi hành án biết rõ tình trạng tài sản, tránh mất thời gian và chi phí.",
      "Thừa hành viên làm việc với cơ quan, tổ chức, cá nhân đang quản lý thông tin, tài sản liên quan và chịu trách nhiệm về kết quả xác minh.",
    ],
    useCases: [
      "Trước khi nộp yêu cầu thi hành án, cần biết người phải thi hành án còn tài sản hay không",
      "Nghi ngờ người phải thi hành án che giấu, tẩu tán tài sản",
      "Cần bổ sung thông tin về tài sản, thu nhập cho hồ sơ thi hành án đang thực hiện",
    ],
    process: [
      "Tiếp nhận yêu cầu, bản án hoặc quyết định và các thông tin đương sự đang có.",
      "Lập danh mục nội dung cần xác minh: nhà đất, phương tiện, tài khoản, thu nhập, nơi cư trú.",
      "Làm việc với cơ quan, tổ chức, cá nhân liên quan để thu thập thông tin theo quy định.",
      "Lập văn bản kết quả xác minh và bàn giao cho người yêu cầu.",
    ],
    notes: ["Thông tin xác minh chỉ được sử dụng đúng mục đích thi hành án và được bảo mật theo quy định."],
  },
  {
    slug: "to-chuc-thi-hanh-an",
    title: "Tổ chức thi hành án dân sự",
    name: "tổ chức thi hành án",
    label: "Tổ chức thi hành án",
    summary: "Trực tiếp tổ chức thi hành bản án, quyết định dân sự theo yêu cầu của đương sự.",
    image: "/images/services/to-chuc-thi-hanh-an.webp",
    definition:
      "Tổ chức thi hành án dân sự là việc Thừa hành viên trực tiếp tổ chức thi hành bản án, quyết định của Tòa án theo yêu cầu của đương sự, trong phạm vi pháp luật cho phép: từ vận động tự nguyện thi hành đến áp dụng biện pháp bảo đảm, cưỡng chế thi hành án khi cần thiết.",
    overview: [
      "Bản án có hiệu lực chỉ thực sự bảo vệ quyền lợi khi được thi hành. Văn phòng tiếp nhận yêu cầu của đương sự và theo sát hồ sơ từ khi tiếp nhận đến khi kết thúc việc thi hành.",
      "Văn phòng ưu tiên để các bên tự nguyện thi hành; chỉ áp dụng biện pháp cưỡng chế như kê biên, xử lý tài sản khi thật sự cần thiết và đúng trình tự luật định.",
    ],
    useCases: [
      "Có bản án, quyết định đã có hiệu lực nhưng bên phải thi hành án không tự nguyện thi hành",
      "Cần thu hồi khoản nợ, tài sản, quyền sử dụng đất theo bản án",
      "Muốn chủ động, theo sát tiến độ thi hành án của hồ sơ",
    ],
    process: [
      "Tiếp nhận yêu cầu thi hành án, kiểm tra bản án, quyết định và phạm vi Văn phòng được tổ chức thi hành.",
      "Xác minh điều kiện thi hành án của người phải thi hành án.",
      "Thông báo, vận động người phải thi hành án tự nguyện thi hành.",
      "Áp dụng biện pháp bảo đảm, cưỡng chế thi hành án khi cần thiết, theo đúng trình tự pháp luật.",
      "Thanh toán tiền, giao tài sản cho người được thi hành án và kết thúc hồ sơ.",
    ],
    notes: [
      "Phạm vi bản án, quyết định Văn phòng được tổ chức thi hành do pháp luật quy định. Thừa hành viên sẽ kiểm tra hồ sơ và tư vấn trước khi tiếp nhận.",
    ],
  },
];

/** Chips in the "Tình huống thường gặp" marquee; icons are /public/images/icons/area-N.svg. */
export const focusAreas = [
  { label: "Giao nhận tiền, tài sản", icon: 9 },
  { label: "Hiện trạng nhà, đất", icon: 6 },
  { label: "Hợp đồng & giao dịch", icon: 3 },
  { label: "Tranh chấp đất đai", icon: 1 },
  { label: "Thu hồi nợ theo bản án", icon: 8 },
  { label: "Hôn nhân & thừa kế", icon: 5 },
  { label: "Doanh nghiệp", icon: 2 },
  { label: "Nội dung trên mạng xã hội", icon: 11 },
  { label: "Xây dựng, lấn chiếm", icon: 7 },
  { label: "Thông báo, giao nhận văn bản", icon: 10 },
  { label: "Quan hệ lao động", icon: 4 },
];

export type Member = {
  slug: string;
  name: string;
  role: string;
  title: string;
  image: string;
  intro: string;
  education: { degree: string; school: string };
  experience: string[];
  lead: string;
  skills: string[];
};

export const team: Member[] = [
  {
    slug: "nguyen-thanh-tin",
    name: "Nguyễn Thành Tín",
    role: "Trưởng Văn phòng",
    title: "Thừa hành viên",
    image: "/images/team/nguyen-thanh-tin.webp",
    intro:
      "Thừa hành viên Nguyễn Thành Tín là Trưởng Văn phòng Thi hành án dân sự Quảng Ngãi, với 21 năm kinh nghiệm trong lĩnh vực pháp luật, trong đó có 14 năm làm Thừa hành viên (Thừa phát lại).",
    education: { degree: "Đại học", school: "Trường Đại học Luật Thành phố Hồ Chí Minh" },
    experience: [
      "21 năm kinh nghiệm trong lĩnh vực pháp luật",
      "14 năm kinh nghiệm làm Thừa hành viên (Thừa phát lại)",
    ],
    lead: "Ông trực tiếp điều hành Văn phòng và thực hiện các công việc của Thừa hành viên: tống đạt, lập vi bằng, xác minh điều kiện thi hành án dân sự và tổ chức thi hành án dân sự.",
    skills: ["Tống đạt", "Lập vi bằng", "Xác minh điều kiện thi hành án dân sự", "Tổ chức thi hành án dân sự"],
  },
];

export const head = team[0];

/** The rest of the office, described by role (the brief names no one else). */
export const teamGroups = [
  {
    title: "Chuyên gia thi hành án dân sự",
    text: "Các Chấp hành viên có kinh nghiệm trong cơ quan Thi hành án dân sự, hỗ trợ chuyên môn cho các hồ sơ thi hành án.",
  },
  {
    title: "Thư ký nghiệp vụ",
    text: "Đã qua đào tạo nghiệp vụ Thừa hành viên, hỗ trợ Thừa hành viên trong tống đạt, lập vi bằng và xác minh.",
  },
  {
    title: "Kế toán, lưu trữ & hành chính",
    text: "Nhân viên kế toán, lưu trữ và hành chính bảo đảm hồ sơ được quản lý, lưu giữ đúng quy định.",
  },
];

/** The six steps from the brief; `detail` is the full text, `text` the card summary. */
export const steps = [
  {
    title: "Tiếp nhận yêu cầu",
    text: "Liên hệ qua điện thoại, Zalo, email hoặc trực tiếp tại Văn phòng.",
    detail:
      "Khách hàng liên hệ với Văn phòng Thi hành án dân sự Quảng Ngãi qua điện thoại, Zalo, email hoặc trực tiếp tại văn phòng để trình bày yêu cầu và cung cấp thông tin ban đầu về vụ việc.",
  },
  {
    title: "Kiểm tra hồ sơ",
    text: "Tiếp nhận giấy tờ, xác định nội dung và phạm vi công việc.",
    detail:
      "Văn phòng tiếp nhận các giấy tờ, tài liệu có liên quan; kiểm tra thông tin và xác định nội dung, phạm vi công việc cần thực hiện.",
  },
  {
    title: "Tư vấn phương án",
    text: "Trao đổi trình tự, thời gian, lưu ý và phương án phù hợp.",
    detail:
      "Thừa hành viên trao đổi với khách hàng về nội dung yêu cầu, điều kiện thực hiện, trình tự, thời gian và những vấn đề cần lưu ý; từ đó xác định phương án thực hiện phù hợp theo quy định pháp luật.",
  },
  {
    title: "Thỏa thuận dịch vụ",
    text: "Thống nhất công việc, thời gian và chi phí trước khi tiến hành.",
    detail:
      "Các bên thống nhất về nội dung công việc, phạm vi thực hiện, thời gian, chi phí và các vấn đề liên quan trước khi tiến hành.",
  },
  {
    title: "Thực hiện yêu cầu",
    text: "Lập vi bằng, tống đạt, xác minh hoặc tổ chức thi hành án.",
    detail:
      "Văn phòng tiến hành công việc theo yêu cầu đã thỏa thuận, như lập vi bằng, tống đạt văn bản, xác minh điều kiện thi hành án hoặc tổ chức thi hành án theo thẩm quyền.",
  },
  {
    title: "Bàn giao kết quả",
    text: "Hoàn thiện hồ sơ, bàn giao kết quả và hướng dẫn sử dụng, lưu giữ.",
    detail:
      "Văn phòng hoàn thiện hồ sơ, lập và đăng ký vi bằng theo quy định hoặc hoàn tất công việc được yêu cầu; bàn giao kết quả, tài liệu cho khách hàng và hướng dẫn khách hàng về việc sử dụng, lưu giữ kết quả.",
  },
];

// Answers written from the brief and general rules on Thừa hành viên; the Trưởng Văn phòng
// should confirm them before launch.
export const faqs = [
  {
    q: "Văn phòng cung cấp những dịch vụ pháp lý nào?",
    a: "Văn phòng Thi hành án dân sự Quảng Ngãi thực hiện 4 chức năng của Thừa hành viên: (1) tống đạt giấy tờ, hồ sơ, tài liệu; (2) lập vi bằng ghi nhận sự kiện, hành vi có thật; (3) xác minh điều kiện thi hành án dân sự; (4) tổ chức thi hành án dân sự theo yêu cầu của đương sự. Trước khi thực hiện, Thừa hành viên tư vấn trình tự, thời gian và những vấn đề cần lưu ý.",
  },
  {
    q: "Tôi có thể đặt lịch tư vấn trước không?",
    a: `Có. Bạn có thể đặt lịch qua điện thoại hoặc Zalo ${office.phone}, email ${office.email}, hoặc gửi yêu cầu qua biểu mẫu trên website. Văn phòng làm việc từ Thứ 2 đến Thứ 6, buổi sáng 7h30 – 11h30, buổi chiều 13h30 – 17h00, tại ${office.address}.`,
  },
  {
    q: "Tôi cần chuẩn bị hồ sơ gì khi đến lập vi bằng?",
    a: "Thông thường bạn cần mang: giấy tờ tùy thân (căn cước hoặc hộ chiếu) của người yêu cầu; giấy tờ liên quan đến sự kiện cần ghi nhận, như hợp đồng, giấy chứng nhận quyền sử dụng đất, giấy tờ tài sản, tài liệu giao nhận; giấy ủy quyền hoặc giấy tờ pháp lý của tổ chức nếu yêu cầu nhân danh tổ chức. Tùy từng trường hợp, Thừa hành viên sẽ hướng dẫn bổ sung.",
  },
  {
    q: "Chi phí lập vi bằng được tính như thế nào?",
    a: "Chi phí lập vi bằng do người yêu cầu và Văn phòng thỏa thuận, căn cứ vào nội dung sự kiện cần ghi nhận, thời gian, địa điểm và khối lượng công việc thực tế. Mức chi phí được thống nhất rõ ràng trước khi Văn phòng tiến hành lập vi bằng.",
  },
  {
    q: "Văn phòng có nhận vụ việc ở ngoài tỉnh không?",
    a: "Văn phòng có nhận vụ việc ở ngoài tỉnh, với những vụ việc có sự kiện, tài sản hoặc khách hàng ở tỉnh khác vui lòng liên hệ Văn phòng để được Thừa hành viên tư vấn chi tiết.",
  },
  {
    q: "Vi bằng có giá trị pháp lý như thế nào?",
    a: "Vi bằng là văn bản do Thừa hành viên lập, ghi nhận sự kiện, hành vi có thật mà Thừa hành viên trực tiếp chứng kiến. Vi bằng là nguồn chứng cứ để Tòa án xem xét khi giải quyết vụ việc và là căn cứ để thực hiện giao dịch theo quy định pháp luật. Vi bằng không thay thế văn bản công chứng, chứng thực.",
  },
  {
    q: "Thừa hành viên và Thừa phát lại khác nhau thế nào?",
    a: "Thừa hành viên là tên gọi hiện nay của chức danh trước đây gọi là Thừa phát lại. Thừa hành viên thực hiện tống đạt, lập vi bằng, xác minh điều kiện thi hành án và tổ chức thi hành án dân sự theo quy định pháp luật.",
  },
];

/** Rotating panel in the home "Về Văn phòng" section. Icons: /public/images/icons/about-N.svg. */
export const pillars = [
  {
    icon: "/images/icons/about-1.svg",
    title: "Sứ mệnh",
    text: "Cung cấp các dịch vụ Thừa hành viên khách quan, chính xác, kịp thời và đúng quy định pháp luật, góp phần bảo vệ quyền và lợi ích hợp pháp của cá nhân, tổ chức.",
  },
  {
    icon: "/images/icons/about-2.svg",
    title: "Tầm nhìn",
    text: "Trở thành một địa chỉ uy tín, chuyên nghiệp và đáng tin cậy trong lĩnh vực pháp luật tại Quảng Ngãi.",
  },
  {
    icon: "/images/icons/about-3.svg",
    title: "Nền tảng hoạt động",
    text: "Lấy sự khách quan, tận tâm, minh bạch và trách nhiệm làm nền tảng trong mọi công việc của Văn phòng.",
  },
];

export const values = [
  { title: "Khách quan", text: "Ghi nhận và thực hiện công việc trung thực, đúng sự thật, không thiên vị bên nào." },
  { title: "Tận tâm", text: "Đồng hành cùng khách hàng trong từng bước, với tinh thần trách nhiệm cao nhất." },
  { title: "Minh bạch", text: "Trình tự, thời gian và chi phí được trao đổi, thống nhất rõ ràng trước khi thực hiện." },
  { title: "Trách nhiệm", text: "Thực hiện đúng quy định pháp luật và chịu trách nhiệm về kết quả công việc." },
];

export const about = {
  intro: `Văn phòng Thi hành án dân sự Quảng Ngãi thực hiện 4 chức năng của Thừa hành viên bao gồm: tống đạt, lập vi bằng, xác minh điều kiện thi hành án dân sự và tổ chức thi hành án dân sự. Văn phòng chính thức khai trương và đi vào hoạt động từ ngày ${office.foundingLabel}.`,
  model: `Văn phòng được tổ chức, hoạt động theo mô hình doanh nghiệp tư nhân, do Thừa hành viên ${office.head} làm Trưởng Văn phòng, trụ sở tại số ${office.address}.`,
  mission:
    "Văn phòng Thi hành án dân sự Quảng Ngãi hướng đến việc cung cấp các dịch vụ Thừa hành viên khách quan, chính xác, kịp thời và đúng quy định pháp luật, góp phần bảo vệ quyền và lợi ích hợp pháp của cá nhân, tổ chức. Với tinh thần tận tâm và trách nhiệm, chúng tôi đồng hành cùng khách hàng trong việc tạo lập, bảo vệ chứng cứ, thực hiện các thủ tục pháp lý và hạn chế những rủi ro có thể phát sinh trong các quan hệ dân sự, kinh doanh và đời sống.",
  vision:
    "Văn phòng hướng tới trở thành một địa chỉ uy tín, chuyên nghiệp và đáng tin cậy trong lĩnh vực pháp luật tại Quảng Ngãi. Văn phòng lấy sự khách quan, tận tâm, minh bạch và trách nhiệm làm nền tảng trong hoạt động. Qua đó, góp phần nâng cao nhận thức pháp luật, hỗ trợ phòng ngừa tranh chấp và thúc đẩy việc bảo vệ quyền, lợi ích hợp pháp của cá nhân, tổ chức trong xã hội.",
};

export const story = [
  { title: "Giới thiệu chung", text: `${about.intro} ${about.model}` },
  { title: "Sứ mệnh", text: about.mission },
  { title: "Tầm nhìn", text: about.vision },
];

/** Registration facts, shown as a definition list: the easiest thing for an AI engine to quote. */
export const officeFacts = [
  { label: "Tên đầy đủ", value: office.fullName },
  { label: "Tên viết tắt", value: office.name },
  { label: "Loại hình", value: office.legalForm },
  { label: "Mã số doanh nghiệp", value: office.taxId },
  { label: "Trưởng Văn phòng", value: `Thừa hành viên ${office.head}` },
  { label: "Ngày hoạt động", value: office.foundingLabel },
  { label: "Trụ sở", value: office.address },
];

export type ArticleSection = { heading: string; paragraphs?: string[]; items?: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  published: string;
  updated: string;
  /** Short answer shown in a box at the top of the article. */
  answer: string;
  sections: ArticleSection[];
  service?: string;
};

// Legal explainers for the "Kiến thức pháp lý" section. Review with the Trưởng Văn phòng before launch.
export const articles: Article[] = [
  {
    slug: "vi-bang-la-gi",
    title: "Vi bằng là gì? Giá trị pháp lý và những lưu ý khi lập vi bằng",
    description:
      "Vi bằng là văn bản do Thừa hành viên lập, ghi nhận sự kiện, hành vi có thật. Tìm hiểu giá trị pháp lý của vi bằng, điểm khác với công chứng và những việc không được lập vi bằng.",
    category: "Vi bằng",
    image: "/images/services/why-choose.jpg",
    published: "2026-09-24",
    updated: "2026-09-24",
    answer:
      "Vi bằng là văn bản do Thừa hành viên (trước đây gọi là Thừa phát lại) lập, ghi nhận sự kiện, hành vi có thật mà Thừa hành viên trực tiếp chứng kiến, theo yêu cầu của cá nhân, cơ quan, tổ chức. Vi bằng là nguồn chứng cứ để Tòa án xem xét khi giải quyết vụ việc, nhưng không thay thế văn bản công chứng, chứng thực.",
    sections: [
      {
        heading: "Giá trị pháp lý của vi bằng",
        items: [
          "Là nguồn chứng cứ để Tòa án xem xét khi giải quyết vụ việc dân sự, hành chính.",
          "Là căn cứ để thực hiện giao dịch giữa các cá nhân, cơ quan, tổ chức theo quy định pháp luật.",
          "Được đăng ký theo quy định, giúp việc sử dụng và đối chiếu về sau thuận lợi hơn.",
        ],
      },
      {
        heading: "Vi bằng khác văn bản công chứng thế nào?",
        paragraphs: [
          "Văn bản công chứng chứng nhận tính xác thực, hợp pháp của hợp đồng, giao dịch. Vi bằng thì chỉ ghi nhận một sự kiện, hành vi có thật đã diễn ra trước sự chứng kiến của Thừa hành viên, không đánh giá hay xác nhận tính hợp pháp của giao dịch.",
          "Vì vậy, với những giao dịch pháp luật bắt buộc phải công chứng, chứng thực (như chuyển nhượng quyền sử dụng đất), vi bằng không thể thay thế.",
        ],
      },
      {
        heading: "Những việc không lập vi bằng",
        items: [
          "Những việc thuộc thẩm quyền công chứng, chứng thực.",
          "Ghi nhận việc chuyển nhượng nhà, đất không đủ điều kiện nhằm hợp thức hóa giao dịch.",
          "Sự kiện, hành vi vi phạm quy định về quốc phòng, an ninh, bí mật đời tư hoặc trái đạo đức xã hội.",
        ],
      },
      {
        heading: "Cần chuẩn bị gì khi yêu cầu lập vi bằng?",
        items: [
          "Giấy tờ tùy thân (căn cước hoặc hộ chiếu) của người yêu cầu.",
          "Giấy tờ liên quan đến sự kiện cần ghi nhận: hợp đồng, giấy tờ nhà đất, giấy tờ tài sản, tài liệu giao nhận.",
          "Giấy ủy quyền hoặc giấy tờ pháp lý của tổ chức nếu yêu cầu nhân danh tổ chức.",
        ],
      },
    ],
    service: "lap-vi-bang",
  },
  {
    slug: "khi-nao-nen-lap-vi-bang",
    title: "7 trường hợp nên lập vi bằng để bảo vệ quyền lợi",
    description:
      "Những tình huống thường gặp nên lập vi bằng: giao nhận tiền, hiện trạng nhà đất, xây dựng lấn chiếm, nội dung trên mạng xã hội, thông báo và cuộc họp doanh nghiệp.",
    category: "Vi bằng",
    image: "/images/cases/case-3.webp",
    published: "2026-09-24",
    updated: "2026-09-24",
    answer:
      "Nên lập vi bằng khi cần lưu lại chứng cứ về một sự kiện, hành vi có thể dẫn đến tranh chấp: giao nhận tiền, tài sản; hiện trạng nhà đất trước khi xây dựng hoặc cho thuê; hành vi lấn chiếm, gây thiệt hại; nội dung trên mạng; việc thông báo, yêu cầu thực hiện nghĩa vụ; cuộc họp doanh nghiệp; việc một bên không thực hiện cam kết.",
    sections: [
      {
        heading: "1. Giao nhận tiền, tài sản, giấy tờ",
        paragraphs: [
          "Khi đặt cọc, trả nợ, giao nhận tài sản có giá trị, vi bằng ghi nhận rõ ai giao, ai nhận, giao gì, vào lúc nào, hạn chế việc một bên phủ nhận về sau.",
        ],
      },
      {
        heading: "2. Hiện trạng nhà, đất, công trình",
        paragraphs: [
          "Trước khi xây dựng, sửa chữa, cho thuê hoặc bàn giao, vi bằng ghi nhận hiện trạng làm căn cứ khi phát sinh hư hỏng, tranh chấp.",
        ],
      },
      {
        heading: "3. Hành vi xây dựng lấn chiếm, gây thiệt hại",
        paragraphs: ["Ghi nhận kịp thời hành vi lấn chiếm đất, làm nứt, lún công trình liền kề trước khi hiện trường thay đổi."],
      },
      {
        heading: "4. Nội dung tin nhắn, email, website, mạng xã hội",
        paragraphs: ["Nội dung trên mạng dễ bị xóa hoặc chỉnh sửa. Vi bằng lưu lại nội dung tại thời điểm Thừa hành viên chứng kiến."],
      },
      {
        heading: "5. Thông báo, yêu cầu thực hiện nghĩa vụ",
        paragraphs: ["Ghi nhận việc gửi thông báo, yêu cầu thanh toán, yêu cầu bàn giao đã được thực hiện đúng thời điểm, đúng người nhận."],
      },
      {
        heading: "6. Cuộc họp, đại hội, sự kiện của doanh nghiệp",
        paragraphs: ["Ghi nhận diễn biến, thành phần tham dự và kết quả biểu quyết để hạn chế tranh chấp nội bộ."],
      },
      {
        heading: "7. Việc một bên không thực hiện cam kết",
        paragraphs: ["Ghi nhận việc một bên vắng mặt, từ chối nhận bàn giao hoặc không thực hiện công việc đã thỏa thuận."],
      },
    ],
    service: "lap-vi-bang",
  },
  {
    slug: "thua-hanh-vien-la-gi",
    title: "Thừa hành viên là gì? 4 công việc Thừa hành viên được thực hiện",
    description:
      "Thừa hành viên là tên gọi hiện nay của Thừa phát lại. Tìm hiểu 4 công việc Thừa hành viên thực hiện: tống đạt, lập vi bằng, xác minh điều kiện thi hành án và tổ chức thi hành án dân sự.",
    category: "Thừa hành viên",
    image: "/images/cases/case-2.webp",
    published: "2026-09-24",
    updated: "2026-09-24",
    answer:
      "Thừa hành viên là tên gọi hiện nay của chức danh trước đây gọi là Thừa phát lại. Thừa hành viên làm việc tại Văn phòng Thi hành án dân sự và thực hiện 4 công việc: tống đạt, lập vi bằng, xác minh điều kiện thi hành án dân sự và tổ chức thi hành án dân sự.",
    sections: [
      {
        heading: "4 công việc của Thừa hành viên",
        items: [
          "Tống đạt giấy tờ, hồ sơ, tài liệu theo yêu cầu của Tòa án, cơ quan thi hành án dân sự.",
          "Lập vi bằng ghi nhận sự kiện, hành vi có thật theo yêu cầu của cá nhân, cơ quan, tổ chức.",
          "Xác minh điều kiện thi hành án dân sự theo yêu cầu của đương sự.",
          "Tổ chức thi hành án dân sự đối với bản án, quyết định theo yêu cầu của đương sự, trong phạm vi pháp luật quy định.",
        ],
      },
      {
        heading: "Văn phòng Thi hành án dân sự là gì?",
        paragraphs: [
          "Văn phòng Thi hành án dân sự (trước đây là Văn phòng Thừa phát lại) là tổ chức hành nghề của Thừa hành viên. Văn phòng Thi hành án dân sự Quảng Ngãi hoạt động theo mô hình doanh nghiệp tư nhân, do Thừa hành viên Nguyễn Thành Tín làm Trưởng Văn phòng.",
        ],
      },
      {
        heading: "Khi nào nên tìm đến Thừa hành viên?",
        items: [
          "Cần tạo lập chứng cứ về một sự kiện, hành vi có thật.",
          "Có bản án, quyết định đã có hiệu lực nhưng chưa được thi hành.",
          "Cần biết người phải thi hành án còn tài sản, thu nhập hay không.",
        ],
      },
    ],
  },
  {
    slug: "xac-minh-dieu-kien-thi-hanh-an",
    title: "Xác minh điều kiện thi hành án: khi nào cần và thực hiện ra sao?",
    description:
      "Xác minh điều kiện thi hành án giúp người được thi hành án biết người phải thi hành án còn tài sản, thu nhập hay không. Khi nào nên yêu cầu và quy trình thực hiện tại Văn phòng.",
    category: "Thi hành án",
    image: "/images/cases/case-4.webp",
    published: "2026-09-24",
    updated: "2026-09-24",
    answer:
      "Xác minh điều kiện thi hành án là việc Thừa hành viên làm rõ tài sản, thu nhập, tài khoản và các điều kiện khác của người phải thi hành án, theo yêu cầu của đương sự. Kết quả được lập thành văn bản, làm căn cứ để yêu cầu thi hành án hoặc lựa chọn phương án tiếp theo.",
    sections: [
      {
        heading: "Khi nào nên yêu cầu xác minh?",
        items: [
          "Trước khi nộp yêu cầu thi hành án, để biết bản án có khả năng thi hành hay không.",
          "Khi nghi ngờ người phải thi hành án che giấu, tẩu tán tài sản.",
          "Khi hồ sơ thi hành án cần bổ sung thông tin về tài sản, thu nhập.",
        ],
      },
      {
        heading: "Những nội dung thường được xác minh",
        items: [
          "Nhà, đất và tài sản gắn liền với đất.",
          "Phương tiện, tài sản có đăng ký quyền sở hữu.",
          "Tài khoản, thu nhập của người phải thi hành án.",
          "Nơi cư trú và các điều kiện khác liên quan đến việc thi hành án.",
        ],
      },
      {
        heading: "Quy trình tại Văn phòng",
        items: [
          "Tiếp nhận yêu cầu, bản án hoặc quyết định và thông tin đương sự đang có.",
          "Thống nhất nội dung cần xác minh, thời gian và chi phí.",
          "Thừa hành viên làm việc với cơ quan, tổ chức, cá nhân liên quan.",
          "Lập văn bản kết quả xác minh và bàn giao cho người yêu cầu.",
        ],
      },
    ],
    service: "xac-minh-dieu-kien-thi-hanh-an",
  },
];
