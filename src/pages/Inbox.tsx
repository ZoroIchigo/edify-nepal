import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Phone, Lock, Paperclip, Image, Mic, CalendarDays,
  Send, Home as HomeIcon, Video, MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer";
import BottomNav from "@/components/BottomNav";

type Screen = "gate" | "list" | "chat";
type Filter = "All" | "Booked" | "Archived";

// Mock: set to true to show inbox with chats, false for gate
const hasBookings = true;
// Mock: set to true for verified adult input bar
const isVerifiedAdult = true;

interface ChatEntry {
  id: number;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  status: "confirmed" | "pending";
  unread: number;
  archived: boolean;
  subject: string;
}

const mockChats: ChatEntry[] = [
  { id: 1, name: "Aaryav Sharma", initials: "AS", lastMessage: "See you Saturday!", time: "2h ago", status: "confirmed", unread: 1, archived: false, subject: "Physics" },
  { id: 2, name: "Priya Shrestha", initials: "PS", lastMessage: "I can do 4PM on Friday", time: "1d ago", status: "confirmed", unread: 0, archived: false, subject: "Math" },
  { id: 3, name: "Rohan Adhikari", initials: "RA", lastMessage: "Booking request sent", time: "3d ago", status: "pending", unread: 0, archived: false, subject: "Physics" },
  { id: 4, name: "Sneha Maharjan", initials: "SM", lastMessage: "Thanks for the session!", time: "1w ago", status: "confirmed", unread: 0, archived: true, subject: "English" },
];

const Inbox = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>(hasBookings ? "list" : "gate");
  const [filter, setFilter] = useState<Filter>("All");
  const [activeChat, setActiveChat] = useState<ChatEntry | null>(null);
  const [messageText, setMessageText] = useState("");

  // Schedule meet
  const [scheduleSheet, setScheduleSheet] = useState(false);
  const [scheduleStep, setScheduleStep] = useState(1);
  const [sessionType, setSessionType] = useState<"physical" | "online" | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [onlinePlatform, setOnlinePlatform] = useState<"edify" | "other" | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filters: Filter[] = ["All", "Booked", "Archived"];

  const filteredChats = mockChats.filter(c => {
    if (filter === "All") return !c.archived;
    if (filter === "Booked") return !c.archived;
    if (filter === "Archived") return c.archived;
    return true;
  });

  const openChat = (chat: ChatEntry) => {
    setActiveChat(chat);
    setScreen("chat");
  };

  const resetSchedule = () => {
    setScheduleStep(1);
    setSessionType(null);
    setSelectedLocation("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedSubject("");
    setOnlinePlatform(null);
    setMeetingLink("");
    setBookingConfirmed(false);
  };

  // ══════════════════════════════════════════
  // GATE SCREEN
  // ══════════════════════════════════════════
  if (screen === "gate") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <nav className="sticky top-0 z-50 flex items-center px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
          <span className="text-xl font-extrabold text-primary tracking-tight">Edify</span>
        </nav>
        <div className="px-5 pt-16 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
            <Send size={48} className="text-secondary/40" />
          </div>
          <p className="text-lg font-extrabold text-foreground mb-1">Your inbox is empty</p>
          <p className="text-sm text-muted-foreground mb-6">Book a tutor or get Student Pass to start messaging</p>
          <div className="flex flex-col gap-3 w-full">
            <Button className="w-full" onClick={() => navigate("/explore")}>
              🔍 Find a Tutor →
            </Button>
            <Button variant="outline" className="w-full border-secondary text-secondary">
              ⭐ Get Student Pass
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // CHAT SCREEN
  // ══════════════════════════════════════════
  if (screen === "chat" && activeChat) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col">
        {/* Chat header */}
        <div className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
          <button onClick={() => { setScreen("list"); setActiveChat(null); }} className="p-1">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-secondary-foreground">{activeChat.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold text-foreground">{activeChat.name}</p>
            <p className="text-[11px] text-muted-foreground">{activeChat.subject} Tutor • ✅ Verified</p>
          </div>
          {isVerifiedAdult ? (
            <button className="p-2">
              <Phone size={20} className="text-primary" />
            </button>
          ) : (
            <button className="p-2 relative" disabled>
              <Phone size={20} className="text-muted-foreground/40" />
              <Lock size={10} className="absolute bottom-1 right-1 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-28">
          {/* Tutor */}
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-3 bg-muted">
              <p className="text-sm text-foreground">Hi {activeChat.name === "Aaryav Sharma" ? "Sushant" : "there"}! Looking forward to our {activeChat.subject} session.</p>
            </div>
          </div>
          {/* Student */}
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 bg-primary">
              <p className="text-sm text-primary-foreground">Thank you! I have some questions about thermodynamics.</p>
            </div>
          </div>
          {/* Tutor */}
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-3 bg-muted">
              <p className="text-sm text-foreground">Perfect, we'll cover that on Saturday.</p>
            </div>
          </div>
          {/* System message */}
          <div className="flex justify-center py-2">
            <p className="text-[11px] text-muted-foreground italic">Lesson confirmed for July 18 • 10:00 AM</p>
          </div>
        </div>

        {/* Input bar */}
        <div className="fixed bottom-14 left-0 right-0 max-w-[430px] mx-auto bg-background border-t border-border">
          {isVerifiedAdult ? (
            <div className="px-3 py-2">
              <div className="flex items-center gap-1 mb-2">
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                  <Paperclip size={18} className="text-muted-foreground" />
                </button>
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                  <Image size={18} className="text-muted-foreground" />
                </button>
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                  <Mic size={18} className="text-muted-foreground" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  onClick={() => { resetSchedule(); setScheduleSheet(true); }}
                >
                  <CalendarDays size={18} className="text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1 rounded-full text-sm"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                />
                <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Send size={16} className="text-primary-foreground" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-warning/10 border-l-4 border-l-warning">
              <div className="flex items-center gap-2 mb-2">
                <Lock size={16} className="text-warning shrink-0" />
                <span className="text-sm font-bold text-foreground">Chat locked — Parent approval required</span>
              </div>
              <Button
                className="w-full text-sm font-bold"
                style={{ backgroundColor: "hsl(38, 92%, 50%)", color: "hsl(0, 0%, 10%)" }}
              >
                Request Parent Approval →
              </Button>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">Or verify your adult status in Account settings</p>
            </div>
          )}
        </div>

        <BottomNav />

        {/* ── SCHEDULE MEET SHEET ── */}
        <Drawer open={scheduleSheet} onOpenChange={(open) => { setScheduleSheet(open); if (!open) resetSchedule(); }}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader className="text-center">
              <DrawerTitle>
                {bookingConfirmed ? "Request Sent!" : "Schedule a Meet"}
              </DrawerTitle>
              <DrawerDescription>
                {bookingConfirmed ? "" : `with ${activeChat.name}`}
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 pb-6 overflow-y-auto">
              {/* STEP 1 - Session Type */}
              {scheduleStep === 1 && !bookingConfirmed && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSessionType("physical")}
                      className={`p-5 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                        sessionType === "physical" ? "border-primary bg-primary/[0.08]" : "border-border"
                      }`}
                    >
                      <HomeIcon size={28} className="text-foreground" />
                      <span className="text-sm font-bold text-foreground">🏠 Physical Session</span>
                    </button>
                    <button
                      onClick={() => setSessionType("online")}
                      className={`p-5 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                        sessionType === "online" ? "border-primary bg-primary/[0.08]" : "border-border"
                      }`}
                    >
                      <Video size={28} className="text-foreground" />
                      <span className="text-sm font-bold text-foreground">💻 Online Session</span>
                    </button>
                  </div>
                  <Button className="w-full" disabled={!sessionType} onClick={() => setScheduleStep(2)}>
                    Next →
                  </Button>
                </div>
              )}

              {/* STEP 2A - Physical */}
              {scheduleStep === 2 && sessionType === "physical" && !bookingConfirmed && (
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">📍 Select Location</p>
                    <p className="text-xs text-muted-foreground mb-2">{activeChat.name} is available in these areas:</p>
                    <div className="flex gap-2 flex-wrap">
                      {["Lalitpur", "Kathmandu - Baneshwor", "Kirtipur"].map(loc => (
                        <button
                          key={loc}
                          onClick={() => setSelectedLocation(loc)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                            selectedLocation === loc
                              ? "bg-primary text-primary-foreground"
                              : "border border-primary text-primary"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-2">🗓️ Preferred Date & Time</p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-xl border border-border shadow-sm pointer-events-auto mb-2"
                    />
                    <div className="flex gap-2 mt-2">
                      {["Morning", "Evening"].map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                            selectedTime === t
                              ? "bg-primary text-primary-foreground"
                              : "border border-border text-muted-foreground"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-2">📚 Select Subject</p>
                    <div className="flex gap-2">
                      {["Physics", "Math"].map(s => (
                        <button
                          key={s}
                          onClick={() => setSelectedSubject(s)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                            selectedSubject === s
                              ? "bg-secondary text-secondary-foreground"
                              : "border border-secondary text-secondary"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!selectedLocation || !selectedDate || !selectedTime || !selectedSubject}
                    onClick={() => setBookingConfirmed(true)}
                  >
                    Send Booking Request →
                  </Button>
                </div>
              )}

              {/* STEP 2B - Online */}
              {scheduleStep === 2 && sessionType === "online" && !bookingConfirmed && (
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-sm font-bold text-foreground mb-2">💻 Session Platform</p>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => { setOnlinePlatform("edify"); setMeetingLink(""); }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          onlinePlatform === "edify" ? "border-primary bg-primary/[0.08]" : "border-border"
                        }`}
                      >
                        <span className="text-sm font-bold text-foreground">🎥 Edify Meet</span>
                        <p className="text-xs text-muted-foreground">Built-in video call</p>
                      </button>
                      <button
                        onClick={() => setOnlinePlatform("other")}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          onlinePlatform === "other" ? "border-primary bg-primary/[0.08]" : "border-border"
                        }`}
                      >
                        <span className="text-sm font-bold text-foreground">🔗 Other Link</span>
                        {onlinePlatform === "other" && (
                          <Input
                            className="mt-2 rounded-full text-sm"
                            placeholder="Paste your meeting link"
                            value={meetingLink}
                            onChange={e => setMeetingLink(e.target.value)}
                            onClick={e => e.stopPropagation()}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-2">🗓️ Preferred Date & Time</p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-xl border border-border shadow-sm pointer-events-auto mb-2"
                    />
                    <div className="flex gap-2 mt-2">
                      {["Morning", "Evening"].map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                            selectedTime === t
                              ? "bg-primary text-primary-foreground"
                              : "border border-border text-muted-foreground"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-2">📚 Select Subject</p>
                    <div className="flex gap-2">
                      {["Physics", "Math"].map(s => (
                        <button
                          key={s}
                          onClick={() => setSelectedSubject(s)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                            selectedSubject === s
                              ? "bg-secondary text-secondary-foreground"
                              : "border border-secondary text-secondary"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!onlinePlatform || !selectedDate || !selectedTime || !selectedSubject}
                    onClick={() => setBookingConfirmed(true)}
                  >
                    Send Booking Request →
                  </Button>
                </div>
              )}

              {/* STEP 3 - Confirmation */}
              {bookingConfirmed && (
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl">✅</span>
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-foreground mb-1">Request Sent!</p>
                    <p className="text-sm text-muted-foreground">{activeChat.name} will confirm within 2 hours.</p>
                  </div>
                  <div className="w-full rounded-xl bg-muted p-4 text-left">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Subject</span>
                        <span className="text-xs font-bold text-foreground">{selectedSubject || "Physics"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Type</span>
                        <span className="text-xs font-bold text-foreground">
                          {sessionType === "physical" ? `Physical • ${selectedLocation || "Lalitpur"}` : "Online"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Time</span>
                        <span className="text-xs font-bold text-foreground">
                          {selectedDate ? selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" }) : "July 22"} • {selectedTime === "Morning" ? "10:00 AM" : "4:00 PM"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-warning/10 text-warning border-0 font-bold text-xs">⏳ Awaiting Tutor Confirmation</Badge>
                  <div className="flex flex-col gap-2 w-full">
                    <Button variant="outline" className="w-full" onClick={() => { setScheduleSheet(false); resetSchedule(); navigate("/account", { state: { screen: "schedule" } }); }}>
                      View in Schedule →
                    </Button>
                    <Button className="w-full" onClick={() => { setScheduleSheet(false); resetSchedule(); }}>
                      Back to Chat
                    </Button>
                  </div>
                  <button className="text-xs font-bold text-secondary">
                    Need help? Request a human callback →
                  </button>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  // ══════════════════════════════════════════
  // CHAT LIST
  // ══════════════════════════════════════════
  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
      <nav className="sticky top-0 z-50 flex items-center px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <span className="text-xl font-extrabold text-foreground tracking-tight">Inbox</span>
      </nav>

      {/* Filter tabs */}
      <div className="px-5 pt-3 pb-2 flex gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "border border-primary text-primary bg-background"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="px-5">
        {filteredChats.map((chat, i) => (
          <div key={chat.id}>
            <button
              onClick={() => openChat(chat)}
              className="flex items-center gap-3 w-full py-3 text-left transition-all active:bg-muted/50 rounded-lg"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-secondary-foreground">{chat.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-bold text-foreground">{chat.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate pr-2">{chat.lastMessage}</p>
                <Badge className={`mt-1 text-[10px] font-bold border-0 ${
                  chat.status === "confirmed"
                    ? "bg-primary/10 text-primary"
                    : "bg-warning/10 text-warning"
                }`}>
                  {chat.status === "confirmed" ? "✅ Lesson Confirmed" : "⏳ Pending Acceptance"}
                </Badge>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary-foreground">{chat.unread}</span>
                </div>
              )}
            </button>
            {i < filteredChats.length - 1 && <div className="h-px bg-border ml-15" />}
          </div>
        ))}
        {filteredChats.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No chats in this category</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Inbox;
