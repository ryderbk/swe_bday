import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles, Clock } from 'lucide-react';
import { TimelineMilestone } from '../../data/birthdayContent';
import { calculateRelationshipTime, formatReadableDate } from '../../lib/dateUtils';
import { SectionHeading } from '../ui/SectionHeading';

interface RelationshipTimelineProps {
  milestones: TimelineMilestone[];
  relationshipStartDate: string;
  showRelationshipCounter?: boolean;
}

export const RelationshipTimeline: React.FC<RelationshipTimelineProps> = ({
  milestones,
  relationshipStartDate,
  showRelationshipCounter = true,
}) => {
  const [duration, setDuration] = useState(() =>
    calculateRelationshipTime(relationshipStartDate)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Real-time counter — ticks every second
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDuration(calculateRelationshipTime(relationshipStartDate));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [relationshipStartDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <SectionHeading
        eyebrow="Our Journey"
        title="The Story of Us"
        subtitle="A chronicle of every quiet spark, shared laugh, and the day that changed everything."
        theme="dark"
      />

      {/* Real-Time Relationship Counter */}
      {showRelationshipCounter && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 p-6 sm:p-8 rounded-2xl bg-midnight-surface/80 border border-champagne/25 shadow-xl backdrop-blur-md text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-champagne/10 blur-2xl pointer-events-none" />
          <div className="flex items-center justify-center gap-2 mb-2 text-champagne text-xs uppercase tracking-widest font-sans font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Since We Became Us</span>
          </div>

          <div className="font-serif text-2xl sm:text-3xl text-ivory font-light mb-6">
            Since {formatReadableDate(relationshipStartDate)}
          </div>

          {/* Years / Months / Days row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto mb-4">
            <div className="p-3 sm:p-4 rounded-xl bg-midnight/80 border border-champagne/15 flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-champagne font-medium">
                {duration.years}
              </span>
              <span className="text-xs text-ivory-dark/70 uppercase tracking-wider mt-1">
                {duration.years === 1 ? 'Year' : 'Years'}
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-midnight/80 border border-champagne/15 flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-champagne font-medium">
                {duration.months}
              </span>
              <span className="text-xs text-ivory-dark/70 uppercase tracking-wider mt-1">
                {duration.months === 1 ? 'Month' : 'Months'}
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-midnight/80 border border-champagne/15 flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-champagne font-medium">
                {duration.days}
              </span>
              <span className="text-xs text-ivory-dark/70 uppercase tracking-wider mt-1">
                {duration.days === 1 ? 'Day' : 'Days'}
              </span>
            </div>
          </div>

          {/* Hours / Minutes / Seconds row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto mb-4">
            <div className="p-2 sm:p-3 rounded-xl bg-midnight/60 border border-rose-muted/20 flex flex-col items-center">
              <span className="font-mono text-2xl sm:text-3xl text-rose-soft font-medium tabular-nums">
                {pad(duration.hours)}
              </span>
              <span className="text-[10px] text-ivory-dark/60 uppercase tracking-wider mt-1">
                Hours
              </span>
            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-midnight/60 border border-rose-muted/20 flex flex-col items-center">
              <span className="font-mono text-2xl sm:text-3xl text-rose-soft font-medium tabular-nums">
                {pad(duration.minutes)}
              </span>
              <span className="text-[10px] text-ivory-dark/60 uppercase tracking-wider mt-1">
                Minutes
              </span>
            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-midnight/60 border border-rose-muted/20 flex flex-col items-center">
              <span className="font-mono text-2xl sm:text-3xl text-rose-soft font-medium tabular-nums">
                {pad(duration.seconds)}
              </span>
              <span className="text-[10px] text-ivory-dark/60 uppercase tracking-wider mt-1">
                Seconds
              </span>
            </div>
          </div>

          <p className="font-mono text-xs text-champagne/60 tracking-wider mt-2">
            {duration.totalDays.toLocaleString()} total days together
          </p>

          <p className="mt-3 font-handwriting text-base sm:text-lg text-champagne/80">
            ...and every second becomes another memory.
          </p>
        </motion.div>
      )}

      {/* Chronological Timeline Spine */}
      <div className="relative border-l border-champagne/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {milestones.map((milestone, idx) => {
          const isConfirmed = milestone.isConfirmed;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 ${
                  isConfirmed
                    ? 'bg-rose-muted border-champagne shadow-glow-champagne text-white'
                    : 'bg-midnight-surface border-champagne/40 text-champagne/70'
                }`}
              >
                {isConfirmed ? (
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                ) : (
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
              </div>

              {/* Card Container */}
              <div
                className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                  isConfirmed
                    ? 'bg-gradient-to-br from-midnight-surface via-[#251f2b] to-midnight-surface border-2 border-champagne/40 shadow-xl'
                    : 'bg-midnight-surface/60 border border-white/10 hover:border-champagne/30'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {milestone.tag && (
                      <span
                        className={`text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isConfirmed
                            ? 'bg-champagne text-midnight font-bold'
                            : 'bg-white/10 text-ivory-dark/80'
                        }`}
                      >
                        {milestone.tag}
                      </span>
                    )}
                    {milestone.date && (
                      <span className="flex items-center gap-1 text-xs text-champagne font-mono">
                        <Calendar className="w-3 h-3" />
                        {formatReadableDate(milestone.date)}
                      </span>
                    )}
                  </div>
                </div>

                <h3
                  className={`font-serif text-xl sm:text-2xl font-light mb-2 ${
                    isConfirmed ? 'text-champagne-light' : 'text-ivory'
                  }`}
                >
                  {milestone.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-ivory-dark/80 leading-relaxed font-light">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
